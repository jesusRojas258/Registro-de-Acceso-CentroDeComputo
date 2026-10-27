import { useEffect, useRef, useState } from 'react'
import { TOTAL_DIGITOS, formatear } from '../Utils/Cuenta'
import { verificarAcceso } from '../Services/Api'

// Segundos que se muestra la pantalla verde/roja antes de volver al inicio.
export const SEGUNDOS_RESULTADO = 5

export function useAcceso() {
  const [digitos, setDigitos] = useState('')
  const [estado, setEstado] = useState({ tipo: 'inicial', mensaje: '' })
  const [verificando, setVerificando] = useState(false)
  const [resultado, setResultado] = useState(null) // { ingreso: boolean, cuenta: string }
  const inputRef = useRef(null)

  const completo = digitos.length === TOTAL_DIGITOS

  // Cuando aparece el resultado, vuelve a la pantalla principal a los 5 segundos.
  useEffect(() => {
    if (!resultado) return
    const temporizador = setTimeout(() => {
      setResultado(null)
      setDigitos('')
    }, SEGUNDOS_RESULTADO * 1000)
    return () => clearTimeout(temporizador)
  }, [resultado])

  function manejarCambio(e) {
    // Solo números; el guion lo agrega la pantalla.
    setDigitos(e.target.value.replace(/\D/g, '').slice(0, TOTAL_DIGITOS))
    if (estado.tipo === 'error') setEstado({ tipo: 'inicial', mensaje: '' })
  }

  async function manejarEnvio(e) {
    e.preventDefault()
    if (verificando) return

    if (!completo) {
      const faltan = TOTAL_DIGITOS - digitos.length
      setEstado({
        tipo: 'error',
        mensaje: `El número de cuenta lleva ${TOTAL_DIGITOS} dígitos. Te ${faltan === 1 ? 'falta 1' : `faltan ${faltan}`}.`,
      })
      inputRef.current?.focus()
      return
    }

    const cuenta = formatear(digitos)
    setVerificando(true)
    let ingreso = false
    try {
      ingreso = await verificarAcceso(cuenta)
    } catch {
      ingreso = false
    }
    setVerificando(false)
    setResultado({ ingreso, cuenta })
  }

  return {
    valorCampo: formatear(digitos),
    completo,
    estado,
    verificando,
    resultado,
    inputRef,
    manejarCambio,
    manejarEnvio,
  }
}