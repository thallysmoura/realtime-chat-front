// Page (componente pai) - sem alteração de nomes existentes, apenas adição de estado replyTo
'use client'

import { useEffect, useState, useRef, use } from "react"
import { io } from "socket.io-client"
import { useParams, useRouter } from "next/navigation"
import ChatArea from "@component/Outros/ChatArea"
import IconLoadingBar from "@component/SvgsIcons/IconLoadingBar"
import API from "app/Service/API"
import Modal from "@component/ap"
import InfoSala from "@component/Contents/Modal/InfoSala"

const audioPop = typeof Audio !== "undefined" ? new Audio("/notification.mp3") : null

export default function Page() {

  const socketRef = useRef(null)

  const { id } = useParams()
  const router = useRouter()

  const timeoutRef = useRef(null)
  const mensagensRef = useRef(null)

  const [mensagem, setMensagem] = useState("")
  const [mensagens, setMensagens] = useState([])
  const [digitando, setDigitando] = useState([])
  const [usuariosOnline, setUsuariosOnline] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [notificacoes, setNotificacoes] = useState(0)
  const [dadosSala, setDadosSala] = useState([])

  const [userData, setUserData] = useState([])
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const mensagensLoading = [
    "Aguarde enquanto preparamos a sala pra você...",
    "Conectando aos participantes...",
    "Carregando suas informações...",
    "Está quase pronto..."
  ]
  const [mensagemAtual, setMensagemAtual] = useState(mensagensLoading[0])
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [contentModal, setContentModal] = useState(null)

  // **novo estado** para armazenar a mensagem que está sendo respondida
  const [replyTo, setReplyTo] = useState(null)

  const getToken = () => localStorage.getItem("token")


  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken()

      if (!token) {
        console.log("Nenhum token encontrado");
        return;
      }

      try {
        const res = await API.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUserData(res.data?.info);
        setUserDataLoaded(true);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData()
  }, [])



  useEffect(() => {
    let index = 0
    const intervalo = setInterval(() => {
      index = (index + 1) % mensagensLoading.length
      setMensagemAtual(mensagensLoading[index])
    }, 3000)
    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Permissão de notificação:", permission);
      });
    }
  }, []);


async function notification(novaMensagem) {
  console.log(novaMensagem)
  if (novaMensagem.id_sala === id && novaMensagem.id !== userData?.id) {
    audioPop?.play();

   

    // Enviar notification push
    if ("Notification" in window && Notification.permission === "granted") {
       // Contador de notificações no título
    if (document.visibilityState !== "visible") {
      setNotificacoes((prev) => prev + 1);
    }

      new Notification(`${novaMensagem.nome} em `, {
        body: novaMensagem.texto,
        icon: novaMensagem.photo, // ícone da sua aplicação
        tag: novaMensagem.texto, // evita duplicar notificações da mesma mensagem
      });

      notification.onclick = () => {
        window.focus();
        router.push(`/Room/${novaMensagem.id_sala}`); // ou a rota da sua sala
        notification.close();
      };

    }
  }
}


  function onRemovido(data) {
    setTitleModal('Atenção')
    setContentModal(<p className="text-base ">{data.mensagem }</p>)
    setShowModal(true)

    setTimeout(() => {
      router.push('/')
    }, 3000);

  }

  useEffect(() => {
    const getToken = () => localStorage.getItem("token")

    const token = getToken()

    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })


    socketRef.current = socket


    socket.on("reconnect_attempt", () => {
      socket.auth = { token: localStorage.getItem("token") }
    })

    socket.on("connect_error", (err) => {
      console.warn("Socket connect_error:", err?.message || err)
      const msg = (err?.message || "").toLowerCase()
      if (msg.includes("unauthorized") || msg.includes("token")) {
        localStorage.removeItem("token")
        router.push("/")
      }
    })

    

    socket.emit("entrar", { sala: id }, (resposta) => {

      if (resposta.error) {
        if(resposta.error === 'PENDENTE')
        {
          setCarregando(false)
          setTitleModal('Aguardando...')
          setContentModal(<p className="text-base ">{resposta.error}</p>)
          setShowModal(true)
         
          return;
        }else{
          setCarregando(false)
          setTitleModal('Atenção')
          setContentModal(<p className="text-base ">{resposta.error}</p>)
          setShowModal(true)
          setTimeout(() => {
            router.push('/')
          }, 2000);
          return;
        }
    
     
      }
      
    
    });


    socket.on("historico", (h) => setMensagens(Array.isArray(h) ? h : []))
    socket.on("dados", (d) => setDadosSala(d || []))
    socket.on("usuarios_online", (n) => setUsuariosOnline(Number(n) || 0))
    socket.on("digitando", (arr) => setDigitando(Array.isArray(arr) ? arr : []))
    socket.on("mensagemAtualizada", (msgAtualizada) => {
      setMensagens((mensagensAntigas) =>
        mensagensAntigas.map((msg) =>
          msg.id_mensagem === msgAtualizada.idMensagem
            ? { ...msg, texto: msgAtualizada.texto, deletada: true }
            : msg
        )
      );
    });
    socket.on("removido", onRemovido);
    socket.on("mensagem", (novaMensagem) => {
      setMensagens((prev) => [...prev, novaMensagem])
      notification(novaMensagem)
    })



    setCarregando(false)

    // cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("sair")
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])






  // --- enviar mensagem usando socketRef.current ---
  async function enviarMensagem() {
    const text = mensagem.trim()
    if (!text) return
    if (!socketRef.current) return

    // Monta payload incluindo replied_to (se existir)
    const payload = {
      mensagem: text,
      sala: id,
      resposta: replyTo
    }


    socketRef.current.emit("mensagem", payload)

    // limpa input e preview de resposta
    setMensagem("")
    setReplyTo(null)
    //audioPop?.play()
  }

  // --- sair (logout) seguro ---
  async function sair() {
    if (socketRef.current) {
      socketRef.current.emit("sair")
      socketRef.current.disconnect()
      socketRef.current = null
    }
    router.push("/Home")
  }

  // título com notificações
  useEffect(() => {
    const tituloPadrao = process.env.NEXT_PUBLIC_TITLE || "MeuChat"
    document.title = notificacoes > 0 ? `(${notificacoes}) ${tituloPadrao}` : tituloPadrao
  }, [notificacoes])

  // reset notificações ao focar a aba
  useEffect(() => {
    const handleVisibilidade = () => {
      if (document.visibilityState === "visible") {
        setNotificacoes(0)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilidade)
    return () => document.removeEventListener("visibilitychange", handleVisibilidade)
  }, [])

  // auto scroll mensagens
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight
    }
  }, [mensagens])

  if (carregando || !userDataLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <IconLoadingBar />
        <p className="mt-4 text-gray-700 text-[30px] animate-pulse">{mensagemAtual}</p>
      </div>
    )
  }

  async function RemoverIntegrante(data) {
    const socket = socketRef.current;
    if (!socket) {
      console.error("Socket não está conectado");
      return;
    }

    socket.emit(
      "removerIntegrante",
      { integranteData: data, sala: dadosSala?.dadosSala },
      (resp) => {
        console.log("Resposta do servidor:", resp);
      }
    );
  }

  async function AprovarSolicitacao(data) {
    const socket = socketRef.current;
    if (!socket) {
      console.error("Socket não está conectado");
      return;
    }

    socket.emit("AprovarSolicitacao",
      { integranteData: data, sala: dadosSala?.dadosSala },
      (resp) => {
        console.log("Resposta do servidor:", resp);
      }
    );
  }

  async function RecusarSolicitacao(data) {
    const socket = socketRef.current;
    if (!socket) {
      console.error("Socket não está conectado");
      return;
    }

    socket.emit("RecusarSolicitacao",
      { integranteData: data, sala: dadosSala?.dadosSala },
      (resp) => {
        console.log("Resposta do servidor:", resp);
      }
    );
  }


  async function handleAbrirInfoSala() {
    setTitleModal('Dados da Sala')
    setContentModal(<InfoSala data={dadosSala} dataUser={userData} RemoverIntegrante={RemoverIntegrante} AprovarSolicitacao={AprovarSolicitacao} RecusarSolicitacao={RecusarSolicitacao} />)
    setShowModal(true)
  }

  return (
    <>
  
        <ChatArea
        dadosSala={dadosSala}
        dataUser={userData}
        usuariosOnline={usuariosOnline}
        digitando={digitando}
        sair={sair} 
        mensagens={mensagens}
        mensagensRef={mensagensRef}
        mensagem={mensagem} 
        setMensagem={setMensagem}
        enviarMensagem={enviarMensagem}
        setMensagens={setMensagens}
        id={id}   
        timeoutRef={timeoutRef}
        socket={socketRef.current}
        // novos props para reply (mantive nomes explícitos)
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        clickInfoSala={handleAbrirInfoSala}
      /> 
   

      <Modal isOpen={showModal} onClose={setShowModal} title={titleModal} existHeader headerColor='bg-gray-400' >
        {contentModal}
      </Modal>
    </>
  )
}
