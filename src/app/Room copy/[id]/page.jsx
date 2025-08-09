"use client"

import { useEffect, useState, useRef } from "react"
import io from "socket.io-client"
import { useParams, useRouter } from "next/navigation"
import ChatArea from "@component/Outros/ChatArea"
import IconLoadingBar from "@component/SvgsIcons/IconLoadingBar"
import API from "app/Service/API"


let socket
const audioPop = typeof Audio !== "undefined" ? new Audio("/notification.mp3") : null


export default function Page() {


  // a responsabilidade agora é saber quem tá entrando na sala através do token;

  const { id } = useParams()
  const router = useRouter()

  const timeoutRef = useRef(null)
  const mensagensRef = useRef(null)


  const [nomeSalvo, setNomeSalvo] = useState(null)
  const [sala, setSala] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [mensagens, setMensagens] = useState([])
  const [digitando, setDigitando] = useState([])
  const [usuariosOnline, setUsuariosOnline] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [notificacoes, setNotificacoes] = useState(0)
  const [dadosSala, setDadosSala] = useState([])
  const [profilePicture, setProfilePicture] = useState('')
  const [changePhoto, setchangePhoto] = useState(false)
  const [userData, setUserData] = useState([])
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const mensagensLoading = [
    "Aguarde enquanto preparamos a sala pra você...",
    "Conectando aos participantes...",
    "Carregando suas informações...",
    "Está quase pronto..."
  ]
  const [mensagemAtual, setMensagemAtual] = useState(mensagensLoading[0])



  useEffect(() => {

    const dadosStr = sessionStorage.getItem("dadosUsuario")
    if (!dadosStr) {
      router.push("/")
      return
    }

    const dados = JSON.parse(dadosStr)

    // Validação: o id da URL deve corresponder ao hash armazenado
    // Se não, volta para home
    if (id !== dados.salaHash && id !== dados.sala) {
      router.push("/")
      return
    }

  


    setNomeSalvo(dados.nome)
    setSala(dados.sala || "")
    setchangePhoto(dados.alterouFoto)
    setProfilePicture(dados.foto)
    setCarregando(false)



  }, [id, router])

  useEffect(() => {
    let index = 0
    const intervalo = setInterval(() => {
      index = (index + 1) % mensagensLoading.length
      setMensagemAtual(mensagensLoading[index])
    }, 3000) // troca a cada 3 segundos

    return () => clearInterval(intervalo)
  }, [])

  async function uploadImage(id, imageBase64) {
    try {
      await API.post(`/uploadPhoto/${id}`, { imagemBase64: imageBase64 })
    } catch (error) {
      console.log(error)
    }
  }

  function atualizarRegistroPhoto() {
    const dadosStr = sessionStorage.getItem("dadosUsuario")
    if (!dadosStr) return
  
    const dados = JSON.parse(dadosStr)

    dados.alterouFoto = false
    sessionStorage.setItem("dadosUsuario", JSON.stringify(dados))
  }

  async function retornaDadosUsuario(id) {
    try {
      const user = await API.get(`/retornaDados/${id}`)
      setUserData(user.data)
      setUserDataLoaded(true) // ✅ Sinaliza que os dados foram carregados
    } catch (error) {
      console.log(error)
    }
  }


  // Conectar socket quando tiver nomeSalvo e id (hash da sala)
  useEffect(() => {
    if (!nomeSalvo || !id) return

    socket = io("http://192.168.15.69:3001", {
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })

    // 1 - entra em uma sala informando NOME, ID, NOME DA SALA;
    socket.emit("entrar", { usuario: nomeSalvo, sala: id, nomeSala: sala })

    // 2 - Puxa o histórico da sala ( SE HOUVER )
    socket.on("historico", setMensagens)

    // 3 - Puxa as informações da sala que foi criada;
    socket.on("dados", setDadosSala)

    // 4 - Puxa o ID do socket gerado pro usuário e atualiza a sua foto de perfil;
    socket.on("idUser", async (e) => {

      if (changePhoto === true) {
        await uploadImage(e.id, profilePicture)
        atualizarRegistroPhoto()
      }

      // Após definir ID, buscar dados do usuário
      await retornaDadosUsuario(e.id)
    })




    socket.on("usuarios_online", setUsuariosOnline)
    socket.on("digitando", setDigitando)
    socket.on("mensagem", (novaMensagem) => {
      console.log(novaMensagem)
      setMensagens((prev) => [...prev, novaMensagem])

      if (novaMensagem.id_sala === id && novaMensagem.nome !== nomeSalvo) {
        audioPop?.play()

        if (document.visibilityState !== "visible") {
          setNotificacoes((prev) => prev + 1)
        }
      }
    })

    return () => {
      if (socket) {
        socket.emit("sair")
        socket.disconnect()
      }
    }
  }, [nomeSalvo, id])





  // @ método responsável pelo envio de mensagem;
  async function enviarMensagem() {
    if (!mensagem.trim()) return

    socket.emit("mensagem", { mensagem, sala: id })
    setMensagem("")
    audioPop?.play()
  }

  // @ método responsável pelo logout do usuário da sala;
  async function sair() {
    if (socket) {
      socket.emit("sair")
      socket.disconnect()
    }
    localStorage.removeItem("nome")
    sessionStorage.removeItem("dadosUsuario")
    setNomeSalvo(null)
    setMensagens([])
    router.push("/")
  }


  // @ método responsável em exibir número de mensagens recebidas na aba do navegador;
  useEffect(() => {
    const tituloPadrao = process.env.NEXT_PUBLIC_TITLE || "MeuChat"

    if (notificacoes > 0) {
      document.title = `(${notificacoes}) ${tituloPadrao}`
    } else {
      document.title = tituloPadrao
    }
  }, [notificacoes])

  // Reseta notificações ao focar a aba
  useEffect(() => {
    const handleVisibilidade = () => {
      if (document.visibilityState === "visible") {
        setNotificacoes(0)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilidade)
    return () => document.removeEventListener("visibilitychange", handleVisibilidade)
  }, [])

  // Auto scroll para baixo nas mensagens novas
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight
    }
  }, [mensagens])



  if (carregando || !userDataLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <IconLoadingBar />
        <p className="mt-4 text-gray-600 text-[20px] animate-pulse">{mensagemAtual}</p>
      </div>
    )
  }



  return (

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
      id={id}
      timeoutRef={timeoutRef}
      socket={socket}
    />


  )
}
