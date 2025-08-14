'use client'

import React, { useState, useEffect } from 'react'
import API from 'app/Service/API'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Join = () => {
  const [telefone, setTelefone] = useState(localStorage.getItem('telefone') || '')
  const [codigo, setCodigo] = useState('')
  const [nome, setNome] = useState('')
  const [etapa, setEtapa] = useState(localStorage.getItem('etapa') || 'telefone') // 'telefone', 'codigo', 'nome', 'bloqueado'
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [timer, setTimer] = useState(0) // segundos restantes para expiração
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const formatarTelefoneE164 = (valor) => {
    if (!valor) return ''
    let digits = valor.replace(/\D/g, '')
    if (digits.length === 11) digits = '55' + digits
    return '+' + digits
  }

  // Envia número e inicia timer
  const enviarNumero = async () => {
    setErro('')
    const telefoneFormatado = formatarTelefoneE164(telefone)
    if (telefoneFormatado.length < 12) {
      setErro('Número inválido')
      return
    }

    try {
      setLoading(true)
      const { data } = await API.post('/auth/solicitar-codigo', { telefone: telefoneFormatado })
      setEtapa('codigo')
      setTimer(data.tempo_expiracao_segundos || 300)
      localStorage.setItem('etapa', 'codigo')
      localStorage.setItem('telefone', telefoneFormatado)
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao enviar SMS')
    } finally {
      setLoading(false)
    }
  }

  // Valida código
  const validarCodigo = async () => {
    setErro('')
    try {
      setLoading(true)
      const { data } = await API.post('/auth/validar-codigo', {
        telefone: formatarTelefoneE164(telefone),
        codigo
      })
      setToken(data.token)
      localStorage.setItem('token', data.token)
      setEtapa('nome')
      localStorage.setItem('etapa', 'nome')
      setCodigo('')
    } catch (err) {
      const mensagem = err.response?.data?.erro || 'Código inválido'
      setErro(mensagem)
      if (mensagem.includes('bloqueado')) {
        setEtapa('bloqueado')
        setTimer(0)
      }
    } finally {
      setLoading(false)
    }
  }

  // Reenvia código
  const reenviarCodigo = async () => {
    setErro('')
    try {
      setLoading(true)
      const { data } = await API.post('/auth/reenviar-codigo', { telefone: formatarTelefoneE164(telefone) })
      setEtapa('codigo')
      setTimer(data.tempo_expiracao_segundos || 300)
      setCodigo('')
    } catch (err) {
      setErro(err.response?.data?.erro || 'Não foi possível reenviar')
    } finally {
      setLoading(false)
    }
  }

  // Salva o nome do usuário
  const salvarNome = async () => {
    if (!nome.trim()) {
      setErro('Informe seu nome')
      return
    }

    try {
      setLoading(true)
      await API.post('/auth/atualizar-nome', { nome }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      localStorage.removeItem('etapa')
      localStorage.removeItem('telefone')
      alert('Cadastro concluído!')
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao salvar nome')
    } finally {
      setLoading(false)
    }
  }

  // Timer regressivo
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatarTimer = (segundos) => {
    const min = Math.floor(segundos / 60).toString().padStart(2, '0')
    const sec = (segundos % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div className="flex flex-col gap-4 w-[250px]">
      {etapa === 'telefone' && (
        <>
          <PhoneInput
            placeholder="Digite seu telefone"
            value={telefone}
            defaultCountry="BR"
            onChange={setTelefone}
          />
          <button
            className="bg-primary p-3 rounded text-white"
            onClick={enviarNumero}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </>
      )}

      {etapa === 'codigo' && (
        <>
          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            maxLength={6}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
            className="border p-2 rounded text-center text-lg tracking-widest"
          />
          <div className="flex justify-between items-center">
            <button
              className="bg-green-600 p-3 rounded text-white"
              onClick={validarCodigo}
              disabled={loading || codigo.length !== 6}
            >
              {loading ? 'Validando...' : 'Validar código'}
            </button>
            <button
              className="text-blue-600 underline text-sm"
              onClick={reenviarCodigo}
              disabled={loading}
            >
              Reenviar código
            </button>
            <span className="text-gray-500 text-sm">{formatarTimer(timer)}</span>
          </div>
        </>
      )}

      {etapa === 'bloqueado' && (
        <div className="flex flex-col gap-2">
          <span className="text-red-600 text-center text-sm">Você atingiu o limite de tentativas</span>
          <button
            className="text-blue-600 underline text-sm"
            onClick={reenviarCodigo}
            disabled={loading}
          >
            Reenviar código
          </button>
          <span className="text-gray-500 text-sm">{formatarTimer(timer)}</span>
        </div>
      )}

      {etapa === 'nome' && (
        <>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded text-center text-lg"
          />
          <button
            className="bg-green-600 p-3 rounded text-white"
            onClick={salvarNome}
            disabled={loading || !nome.trim()}
          >
            {loading ? 'Salvando...' : 'Salvar nome'}
          </button>
        </>
      )}

      {erro && <div className="text-red-500 text-sm">{erro}</div>}
    </div>
  )
}

export default Join
