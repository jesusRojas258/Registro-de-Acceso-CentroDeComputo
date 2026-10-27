import { useState } from 'react'

export function useMenuAdmin() {
  const [abierto, setAbierto] = useState(false)

  return {
    abierto,
    alternar: () => setAbierto((valor) => !valor),
    cerrar: () => setAbierto(false),
  }
}