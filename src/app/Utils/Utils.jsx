import API from "app/Service/API"

// método responsável em uma geração de hash único que servirá como o ID da sala;
export async function gerarHashSalabkp(texto) {
  const encoder = new TextEncoder()
  const data = encoder.encode(texto + Date.now())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex.slice(0, 30)
}


export async function gerarHashSala() {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let hash = ''

  for (let i = 0; i < 40; i++) {
    const indice = Math.floor(Math.random() * caracteres.length)
    hash += caracteres[indice]
  }

  return hash
}


export function isUrl(text) {
  try {
    const url = new URL(text)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

