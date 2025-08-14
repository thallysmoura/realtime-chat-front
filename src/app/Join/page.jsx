"use client";

import React, { useState, useEffect, useRef } from "react";
import API from "app/Service/API";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Button2 from "@component/Button2";
import Modal from "@component/ap";
import Welcome from "@component/SvgsIcons/WelcomeIcon";
import WelcomeIcon from "@component/SvgsIcons/WelcomeIcon";
import { useRouter } from 'next/navigation'

const Join = () => {

  const router = useRouter()

  const FOTO_PADRAO = 'https://res.cloudinary.com/dq1tse0wb/image/upload/v1754924344/perfil_0_ijhdrb.png'
  const inputImagemRef = useRef(null)
  const [foto, setFoto] = useState(FOTO_PADRAO)
  const [arquivoImagem, setArquivoImagem] = useState(null)


  const [telefone, setTelefone] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [etapa, setEtapa] = useState(""); // 'telefone', 'codigo', 'nome', 'bloqueado'
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [timer, setTimer] = useState(0); // segundos restantes para expiração
  const [token, setToken] = useState( "");
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);


  /*
  useEffect(() => {
    const tokenLS = localStorage.getItem("token");
  
    // limpa tudo, mas preserva o token
    localStorage.clear();
    if (tokenLS) {
      localStorage.setItem("token", tokenLS);
      setToken(tokenLS);
    }
  
    // volta para a etapa inicial
    setEtapa("telefone");
    setTelefone("");
  }, []);
*/


const converterParaBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

const handleSelecionarImagem = async (e) => {
const file = e.target.files[0]
if (file && file.type.startsWith('image/')) {
  setFoto(URL.createObjectURL(file))
  setArquivoImagem(file)
  document.getElementById("nome").focus()
}
}
  
  // useEffect roda só no cliente
  useEffect(() => {
    const telefoneLS = localStorage.getItem('telefone') || ''
    const etapaLS = localStorage.getItem('etapa') || 'telefone'
    const tokenLS = localStorage.getItem('token') || ''

    setTelefone(telefoneLS)
    setEtapa(etapaLS)
    setToken(tokenLS)
  }, [])

  // ---------- FUNÇÕES AUXILIARES ----------
  const formatarTelefoneE164 = (valor) => {
    if (!valor) return "";
    let digits = valor.replace(/\D/g, "");
    if (digits.length === 11) digits = "55" + digits;
    return "+" + digits;
  };

  const salvarToken = (novoToken) => {
    localStorage.clear(); // limpa todos os dados
    localStorage.setItem("token", novoToken); // salva apenas token
    setToken(novoToken);
  };

  const buscarUsuario = async (token) => {
    try {
      const { data } = await API.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(data?.info);
      if(data?.info.nome !== null){
        router.push('/Home')
      }
    
      console.log("Usuário autenticado:", data);
    } catch (err) {
      console.error("Token inválido ou expirado:", err);
      localStorage.removeItem("token");
      setToken("");
    }
  };

  // ---------- EFEITO DE INICIALIZAÇÃO ----------
// ---------- EFEITO DE INICIALIZAÇÃO ----------
useEffect(() => {
  if (token) {
    buscarUsuario(token);
  }
}, [token]);


  // ---------- CONFIRMAÇÃO DO NÚMERO ----------
  async function confirmarNumero() {
    setTitleModal(`Você confirma seu telefone ${telefone}?`);
    setContentModal(
      <section className="flex flex-col gap-3">
        <div className="text-base text-gray-800">
          Você confirma que seu número é <strong>{telefone}</strong>?
        </div>
        <div className="flex justify-end gap-2">
          <Button2
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              document.getElementById("telefone").focus();
            }}
          >
            Corrigir
          </Button2>
          <Button2
            variant="success"
            onClick={async () => {
              await enviarNumero();
              setShowModal(false);
            }}
          >
            Sim
          </Button2>
        </div>
      </section>
    );
    setShowModal(true);
  }

  const enviarNumero = async () => {
    setErro("");
    const telefoneFormatado = formatarTelefoneE164(telefone);
    if (telefoneFormatado.length < 12) {
      setErro("Número inválido");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/auth/solicitar-codigo", {
        telefone: telefoneFormatado,
      });
      setEtapa("codigo");
      setTimer(data.tempo_expiracao_segundos || 300);
      localStorage.setItem("etapa", "codigo");
      localStorage.setItem("telefone", telefoneFormatado);
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao enviar SMS");
    } finally {
      setLoading(false);
    }
  };

  // ---------- VALIDAÇÃO DO CÓDIGO ----------
  const validarCodigo = async () => {
    setErro("");
    try {
      setLoading(true);
      const { data } = await API.post("/auth/validar-codigo", {
        telefone: formatarTelefoneE164(telefone),
        codigo,
      });
      salvarToken(data.token); // SALVA TOKEN E REMOVE OUTROS DADOS
      setEtapa("nome");
      // localStorage.setItem("etapa", "nome");
      setCodigo("");
    } catch (err) {
      const mensagem = err.response?.data?.erro || "Código inválido";
      setErro(mensagem);
      setCodigo("");
      document.getElementById("codigo").focus();
      if (mensagem.includes("bloqueado")) {
        setEtapa("bloqueado");
        setTimer(0);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- OUTRAS FUNÇÕES ----------
  const reenviarCodigo = async () => {
    setErro("");
    try {
      setLoading(true);
      const { data } = await API.post("/auth/reenviar-codigo", {
        telefone: formatarTelefoneE164(telefone),
      });
      setEtapa("codigo");
      setTimer(data.tempo_expiracao_segundos || 300);
      setCodigo("");
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível reenviar");
    } finally {
      setLoading(false);
    }
  };

  const salvarNome = async () => {
    if (!nome.trim()) {
      setErro("Informe seu nome");
      return;
    }

    try {
      setLoading(true);
      await API.post(
        "/auth/atualizar-nome",
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("etapa");
      localStorage.removeItem("telefone");
      alert("Cadastro concluído!");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao salvar nome");
    } finally {
      setLoading(false);
    }
  };

  // ---------- TIMER REGRESSIVO ----------
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatarTimer = (segundos) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const sec = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  async function handleSaveName(){

    const token2 = localStorage.getItem("token");


    if (!nome){
      document.getElementById("nome").focus()
      return;
    }

    let imagemBase64 = ''

    if (arquivoImagem) {
      try {
        imagemBase64 = await converterParaBase64(arquivoImagem)
      } catch (error) {
        console.error('Erro ao converter imagem:', error)
      }
    }

   
    try {
     
      const update = await API.post("/updateProfile", { nome, photo: imagemBase64 || null }, {
        headers: { Authorization: `Bearer ${token2}` },
      });

      let resUpdate = update.data;

      let token = resUpdate.token;
      localStorage.setItem('token', token)
      router.push('/Home')

    } catch (error) {
      console.log(error)
    }
    

  }


  // ---------- RENDER ----------
  return (
    <>
      {usuario ? (
        
        <main className="flex flex-col text-center justify-center items-center h-screen gap-3">
        <section>
          <p className="text-gray-700 font-medium text-2xl mb-5">Perfil</p>
        </section>
          <section>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`p-[5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 cursor-pointer`}
                onClick={() => { inputImagemRef.current?.click() }}
              >
                <img
                  src={foto}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover bg-white"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                ref={inputImagemRef}
                onChange={handleSelecionarImagem}
                className="hidden"
              />
              <small className="text-primary cursor-pointer hover:underline" onClick={() => inputImagemRef.current?.click()}>
                Editar
              </small>
            </div>
          </section>

        <section className="flex flex-col gap-3 w-full">

            <main className="flex text-left flex-col gap-0 px-6">
              <div>
                  <small className="text-gray-600 font-medium">
                    Nome
                  </small>
              </div>
              <div>
              <input
                  type="text"
                  placeholder=""
                  id="nome"
                  autoFocus
                  className="p-1 px-3 py-2 text-gray-700 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </main>
        </section>

        <section className="mt-10 w-full px-6">
          <Button2 disabled={!nome.trim()} className="w-full disabled:opacity-20 disabled:cursor-not-allowed" variant="success" onClick={handleSaveName}>
            Continuar
          </Button2>
        </section>
      </main>
      
      ) : (
        <>

          {etapa === "telefone" && (
            <main className="flex flex-col text-center justify-center items-center h-screen gap-3">
              <section>
                <WelcomeIcon />
              </section>

              <section>
                <p className="text-[#156652] font-medium text-2xl">
                  Entre com seu número de telefone
                </p>
              </section>

              <section>
                <small className="text-gray-600 text-sm">
                  Informe seu número. Em seguida, enviaremos um código para
                  confirmar e prosseguir.
                </small>
              </section>

              <section>
                <PhoneInput
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  id="telefone"
                  defaultCountry="BR"
                  className="bg-white  text-gray-700 text-base outline-none border p-2 rounded-md focus:outline-none  focus:ring-blue-500 w-full"
                  onChange={setTelefone}
                />
              </section>

              <section className="mt-10 w-full px-6">
                <Button2 disabled={!telefone.length} className="w-full disabled:opacity-20 disabled:cursor-not-allowed" variant="success" onClick={confirmarNumero}>
                  Continuar
                </Button2>
              </section>
            </main>
          )}

          {etapa === "codigo" && (
            <main className="flex flex-col text-center justify-center items-center h-screen gap-3">
              <section>
                <WelcomeIcon />
              </section>

              <section>
                <p className="text-[#156652] font-medium text-2xl">
                  Verifique {telefone}
                </p>
              </section>

              <section>
                <small className="text-gray-600 text-sm">
                  Enviamos um SMS com PIN de 6 digitos para seu telefone.
                </small>
              </section>

              <section className="flex justify-center flex-col gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="XXXXXX"
                    value={codigo}
                    autoFocus
                    id="codigo"
                    maxLength={6}
                    onChange={(e) =>
                      setCodigo(e.target.value.replace(/\D/g, ""))
                    }
                    className="border p-2 rounded text-center text-lg tracking-widest"
                  />
                </div>
                <section>
                  {erro && <div className="text-red-500 text-sm">{erro}</div>}
                </section>
                <div className="flex items-center gap-3">
                  <button
                    className="text-blue-600 text-base"
                    onClick={reenviarCodigo}
                    disabled={loading}
                  >
                    Reenviar código
                  </button>
                  <section className="mt-10"></section>
                  <span className="text-gray-600 text-base mr-5">
                    {formatarTimer(timer)}
                  </span>
                  <Button2
                    className="disabled:opacity-40 disabled:cursor-not-allowed"
                    variant="success"
                    onClick={validarCodigo}
                    disabled={loading || codigo.length !== 6}
                  >
                    {loading ? "Validando..." : "Próximo"}
                  </Button2>
                </div>
              </section>
            </main>
          )}

          {etapa === "bloqueado" && (
            <main className="flex flex-col text-center justify-center items-center h-screen gap-3">
              <section>
                <WelcomeIcon />
              </section>

              <section>
                <p className="text-[#156652] font-medium text-2xl">
                  Verifique {telefone}
                </p>
              </section>

              <section>
                <small className="text-gray-600 text-sm">
                  Enviamos um SMS com PIN de 6 digitos para seu telefone.
                </small>
              </section>

              <section className="flex justify-center flex-col gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="XXXXXX"
                    value={codigo}
                    disabled
                    maxLength={6}
                    onChange={(e) =>
                      setCodigo(e.target.value.replace(/\D/g, ""))
                    }
                    className="border p-2 rounded text-center text-lg tracking-widest"
                  />
                </div>
                <section>
                  <span className="text-red-600 text-center text-sm">
                    Você atingiu o limite de tentativas
                  </span>
                </section>
                <div className="flex items-center gap-3">
                  <button
                    className="text-blue-600 text-base"
                    onClick={reenviarCodigo}
                    disabled={loading}
                  >
                    Reenviar código
                  </button>
                  <section className="mt-10"></section>
                  <span className="text-gray-600 text-base mr-5">
                    {formatarTimer(timer)}
                  </span>
                 
                </div>
              </section>
            </main>
          )}
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={setShowModal}
        title={titleModal}
        existHeader={true}
        headerColor="bg-[#405DA1]"
      >
        {contentModal}
      </Modal>
    </>
  );
};

export default Join;
