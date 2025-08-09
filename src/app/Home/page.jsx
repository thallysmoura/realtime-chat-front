'use client'

import IconLoadingBar from '@component/SvgsIcons/IconLoadingBar'
import { gerarHashSala } from '@utils/Utils'
import API from 'app/Service/API'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Home() {

  const FOTO_PADRAO = 'https://res.cloudinary.com/dq1tse0wb/image/upload/v1754318471/perfil_0_kozz3d.png'
  const inputImagemRef = useRef(null)


  const router = useRouter()

  const [nome, setNome] = useState('')
  const [sala, setSala] = useState('')
  const [foto, setFoto] = useState(FOTO_PADRAO)
  const [arquivoImagem, setArquivoImagem] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [querEntrar, setQuerEntrar] = useState(false)
  const [codigoSalaExistente, setCodigoSalaExistente] = useState('')
  const [carregandoSalaExistente, setCarregandoSalaExistente] = useState(false)
  const [erros, setErros] = useState({ nome: '', sala: '', codigo: '', salaInexistente: '' })



  // novos

  const [usuario, setUsuario] = useState([])

  // novo: controla quando a checagem de sessão terminou
  const [sessionChecked, setSessionChecked] = useState(false)

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
    }
  }

  // Helper: derivado seguro para saber se usuário está autenticado
  const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  }

  const isAuthenticated = Boolean(
    getToken() &&
    usuario &&
    typeof usuario === 'object' &&
    // considera usuário autenticado se houver foto ou nome — mais robusto que só photo
    (usuario.photo || usuario.nome)
  )

  // ok
  const checaSessao = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSessionChecked(true)
      return;
    }
    try {
      const res = await API.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(res.data)
    } catch (error) {
      localStorage.removeItem("token")
      setUsuario([]) // mantém compatibilidade
    } finally {
      // sempre sinaliza que a checagem terminou
      setSessionChecked(true)
    }
  };

  // ok
  const Entrar = async () => {
    const novoErro = {
      nome: nome.trim() ? '' : 'Informe seu nome',
      //sala: sala.trim() ? '' : 'Informe o nome da sala',
      codigo: '',
      salaInexistente: ''
    }

    setErros(novoErro)
    if (novoErro.nome) return

    setCarregando(true)
    setSessionChecked(false)
    let imagemBase64 = ''

    if (arquivoImagem) {
      try {
        imagemBase64 = await converterParaBase64(arquivoImagem)
      } catch (error) {
        console.error('Erro ao converter imagem:', error)
      }
    }

    try {
      let req = await API.post('/register', { nome, photo: imagemBase64 || null })
      let res = req.data;
      if (res) {
        let token = res.token;
        localStorage.setItem('token', token)
        await checaSessao()
        setCarregando(false)
        setSessionChecked(true)
      }
    } catch (error) {
      console.log(error)
      setCarregando(false)
    }



  }


  useEffect(() => {
    checaSessao();
  }, []);

  // ok
  async function logout() {
    localStorage.removeItem("token");
    router.push('/')
  }


  const entrarSalaExistente = async () => {
    const novoErro = {
      nome: nome.trim() ? '' : 'Informe seu nome',
      sala: '',
      codigo: codigoSalaExistente.trim() ? '' : 'Informe o código da sala',
      salaInexistente: ''
    }

    setErros(novoErro)
    if (novoErro.codigo) return

    setCarregandoSalaExistente(true)

    try {
      const res = await API.get(`/verificar-sala/${codigoSalaExistente.trim()}`)
      const existe = res.data?.existe

      if (!existe) {
        setErros((prev) => ({
          ...prev,
          salaInexistente: 'Código inválido ou sala não encontrada.'
        }))
        setCarregandoSalaExistente(false)
        return
      }

      router.push(`/Room/${codigoSalaExistente.trim()}`)

    } catch (err) {
      console.error('Erro ao verificar sala:', err)
      setErros((prev) => ({
        ...prev,
        salaInexistente: 'Erro na verificação. Tente novamente.'
      }))
      setCarregandoSalaExistente(false)
    }
  }

  async function handleCreateRoom() {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!sala.trim()) return;

    const hashSala = await gerarHashSala(sala);

    try {
      const req = await API.post(
        "/create-room",
        { salaId: hashSala, nomeSala: sala },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (req.data) {
        router.push(`/Room/${req.data.room}`)
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  }


  // mostra loading overlay enquanto checamos a sessão inicial
  if (!sessionChecked) {
    return (
      <div className='fixed top-0 left-0 w-screen h-screen bg-[#F9FAFB] flex items-center justify-center'>
        <div className='animate-pulse'>
          <div role="status">
            <IconLoadingBar />
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 transition-opacity duration-400 ease-in">
      <div className="w-full max-w-[350px] flex flex-col gap-4 opacity-100">

      
       
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`p-[5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 ${isAuthenticated ? 'cursor-default' : 'cursor-pointer'} `}
            onClick={() => { !isAuthenticated && inputImagemRef.current?.click() }}
          >
            <img
              src={isAuthenticated ? (usuario?.photo ?? foto) : foto}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover bg-white"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            hidden={isAuthenticated}
            ref={inputImagemRef}
            onChange={handleSelecionarImagem}
            className="hidden"
          />
          <small hidden={isAuthenticated} className="text-gray-500 cursor-pointer hover:underline" onClick={() => inputImagemRef.current?.click()}>
            Alterar foto de perfil
          </small>
        </div>

        {/* Nome */}
        <div className="flex flex-col gap-1">
          <small hidden={isAuthenticated} className="text-gray-600">Pra começar, informe seu nome abaixo:</small>
          {
            isAuthenticated &&
            (
              <>
                <small onClick={logout} className=" cursor-pointer text-[19px] text-center text-primary">Bem-vindo, {usuario?.nome}!</small>
                <small onClick={logout} className=" cursor-pointer text-base text-center text-red-500">Sair</small>

              </>


            )
          }
          <input
            type="text"
            autoFocus
        
            hidden={isAuthenticated}
            placeholder="Ex: João"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <small className="text-red-500">{erros.nome}</small>}
        </div>

        {/* Nome da sala */}
        {
          isAuthenticated && (
            <div className="flex flex-col gap-1">
              <small className="text-gray-600">Insira um nome para sua sala:</small>
              <input
                type="text"
                placeholder="Ex: Sala de Jogos"
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                disabled={querEntrar}
              />
              {!querEntrar && erros.sala && <small className="text-red-500">{erros.sala}</small>}
            </div>
          )
        }


        {/* Botão Criar */}
        <div>
          {
            isAuthenticated ?
              (
                <button
                  onClick={handleCreateRoom}
                  className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
                >
                  {carregando ? 'Aguarde...' : 'Criar Sala'}
                </button>
              )
              :
              (
                <button
                  onClick={Entrar}
                  disabled={carregando || querEntrar}
                  className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
                >
                  {carregando ? 'Aguarde...' : 'Entrar'}
                </button>
              )
          }


        </div>

        {/* Entrar em sala existente */}
        {
          isAuthenticated && (
            <div className="mt-4 text-center text-gray-700">
              <p>Quer ingressar em uma sala existente?</p>
              <button
                onClick={() => {
                  setQuerEntrar(true)
                  setErros({ nome: '', sala: '', codigo: '', salaInexistente: '' })
                }}
                className="mt-2 px-4 py-2 bg-[#17B8A6] text-white rounded-xl hover:bg-[#118477]"
              >
                Sim
              </button>

              {/* Modal */}
              {querEntrar && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                
                  <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                    
                    <h2 className="text-2xl font-semibold mb-4 animate-slideIn">Insira o código da sala</h2>

                    <input
                      type="text"
                      placeholder="Código da sala"
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                      value={codigoSalaExistente}
                      onChange={(e) => {
                        setCodigoSalaExistente(e.target.value)
                        setErros((prev) => ({ ...prev, salaInexistente: '' }))
                      }}
                    />
                    {erros.codigo && <small className="text-red-500">{erros.codigo}</small>}
                    {erros.salaInexistente && <small className="text-red-500">{erros.salaInexistente}</small>}

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => {
                          setQuerEntrar(false)
                          setCodigoSalaExistente('')
                          setErros({ nome: '', sala: '', codigo: '', salaInexistente: '' })
                        }}
                        className="w-full bg-gray-200 text-gray-700 px-1 text-sm py-2 rounded-xl hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={entrarSalaExistente}
                        disabled={carregandoSalaExistente}
                        className="w-full bg-[#405DA1]  text-white px-4 py-2 text-sm rounded-xl hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
                      >
                        {carregandoSalaExistente ? 'Entrando...' : 'Entrar'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }

      </div>
    </div>
  )
}
