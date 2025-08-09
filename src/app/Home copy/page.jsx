'use client'

import { gerarHashSala } from '@utils/Utils'
import API from 'app/Service/API'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Home() {

  const FOTO_PADRAO = 'https://res.cloudinary.com/dq1tse0wb/image/upload/v1754318471/perfil_0_kozz3d.png'


  // toda logistica agora de JWT será aqui agora
  // validar JWT
  // retornar token e ir pra sala (ingressar ou criar)

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

  const inputImagemRef = useRef(null)

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

  const Entrar = async () => {
    const novoErro = {
      nome: nome.trim() ? '' : 'Informe seu nome',
      sala: sala.trim() ? '' : 'Informe o nome da sala',
      codigo: '',
      salaInexistente: ''
    }

    setErros(novoErro)
    if (novoErro.nome || novoErro.sala) return

    setCarregando(true)
    const hashSala = await gerarHashSala(sala)

    let imagemBase64 = ''
    let alterouFoto = false

    if (arquivoImagem) {
      try {
        imagemBase64 = await converterParaBase64(arquivoImagem)
        alterouFoto = true
      } catch (error) {
        console.error('Erro ao converter imagem:', error)
      }
    }

    sessionStorage.setItem(
      'dadosUsuario',
      JSON.stringify({
        nome,
        sala,
        salaHash: hashSala,
        foto: imagemBase64 || foto,
        alterouFoto
      })
    )

    router.push(`/Room/${hashSala}`)
  }


  const entrarSalaExistente = async () => {
    const novoErro = {
      nome: nome.trim() ? '' : 'Informe seu nome',
      sala: '',
      codigo: codigoSalaExistente.trim() ? '' : 'Informe o código da sala',
      salaInexistente: ''
    }

    setErros(novoErro)
    if (novoErro.nome || novoErro.codigo) return

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

      let imagemBase64 = ''
      let alterouFoto = false

      if (arquivoImagem) {
        try {
          imagemBase64 = await converterParaBase64(arquivoImagem)
          alterouFoto = true
        } catch (error) {
          console.error('Erro ao converter imagem:', error)
        }
      }

      sessionStorage.setItem(
        'dadosUsuario',
        JSON.stringify({
          nome,
          salaHash: codigoSalaExistente.trim(),
          foto: imagemBase64 || foto,
          alterouFoto
        })
      )

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



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[350px] flex flex-col gap-4">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={foto}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            onClick={() => inputImagemRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={inputImagemRef}
            onChange={handleSelecionarImagem}
            className="hidden"
          />
          <small className="text-gray-500 cursor-pointer hover:underline" onClick={() => inputImagemRef.current?.click()}>
            Alterar foto de perfil
          </small>
        </div>

        {/* Nome */}
        <div className="flex flex-col gap-1">
          <small className="text-gray-600">Informe seu nome:</small>
          <input
            type="text"
            placeholder="Ex: João"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erros.nome && <small className="text-red-500">{erros.nome}</small>}
        </div>

        {/* Nome da sala */}
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

        {/* Botão Criar */}
        <div>
          <button
            onClick={Entrar}
            disabled={carregando || querEntrar}
            className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
          >
            {carregando ? 'Aguarde...' : 'Criar sala e entrar'}
          </button>
        </div>

        {/* Entrar em sala existente */}
        <div className="mt-4 text-center text-gray-700">
          <p>Quer ingressar em uma sala existente?</p>
          <button
            onClick={() => {
              setQuerEntrar(true)
              setErros({ nome: '', sala: '', codigo: '', salaInexistente: '' })
            }}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sim
          </button>

          {/* Modal */}
          {querEntrar && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Digite o código da sala</h2>

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
                    className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={entrarSalaExistente}
                    disabled={carregandoSalaExistente}
                    className="w-full bg-[#405DA1] text-white px-4 py-2 rounded-md hover:bg-[#31477a] disabled:opacity-50 disabled:cursor-wait"
                  >
                    {carregandoSalaExistente ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
