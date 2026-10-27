import { useEffect, useRef, useState } from 'react'
import './App.css'

// Cantidad de dígitos del número de cuenta (sin contar el guion).
// Con 8 dígitos el formato es 1234567-8. Si necesitas 9, cambia este valor.
const TOTAL_DIGITOS = 8

// Segundos que se muestra la pantalla verde/roja antes de volver al inicio.
const SEGUNDOS_RESULTADO = 5

// Cuentas de prueba para poder ver la pantalla verde.
// Cualquier otra cuenta mostrará la pantalla roja.
const CUENTAS_DEMO = ['1234567-8']

// Pone el guion antes del último dígito: 12345678 -> 1234567-8
function formatear(digitos) {
  if (digitos.length < TOTAL_DIGITOS) return digitos
  return `${digitos.slice(0, TOTAL_DIGITOS - 1)}-${digitos.slice(TOTAL_DIGITOS - 1)}`
}

// TODO: reemplazar por la llamada real al backend, por ejemplo:
//   const res = await fetch('http://localhost:3000/api/accesos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ cuenta }),
//   })
//   const datos = await res.json()
//   return datos.ingreso   // true o false
async function verificarAcceso(cuenta) {
  return CUENTAS_DEMO.includes(cuenta)
}

function App() {
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

  // Pantalla verde o roja
  if (resultado) {
    const { ingreso, cuenta } = resultado
    return (
      <main
        className={`resultado ${ingreso ? 'resultado--ok' : 'resultado--no'}`}
        role="alert"
      >
        <svg
          className="resultado__icono"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {ingreso ? (
            <path d="M4 12.5l5 5L20 6.5" />
          ) : (
            <path d="M6 6l12 12M18 6L6 18" />
          )}
        </svg>

        <h1 className="resultado__titulo">
          {ingreso ? 'Acceso permitido' : 'Acceso denegado'}
        </h1>
        <p className="resultado__cuenta">Cuenta {cuenta}</p>
        <p className="resultado__texto">
          {ingreso
            ? 'Puedes pasar al centro de cómputo.'
            : 'Esta cuenta no tiene acceso. Acércate con el encargado.'}
        </p>

        <div className="resultado__barra" aria-hidden="true">
          <div
            className="resultado__barra-progreso"
            style={{ animationDuration: `${SEGUNDOS_RESULTADO}s` }}
          />
        </div>
      </main>
    )
  }

  // Pantalla principal
  return (
    <main className="acceso">
      <header className="acceso__encabezado">
        <p className="acceso__lugar">Centro de cómputo</p>
        <h1 className="acceso__titulo">Registro de acceso</h1>
      </header>

      <form className="acceso__form" onSubmit={manejarEnvio} noValidate>
        <label className="acceso__etiqueta" htmlFor="cuenta">
          Número de cuenta
        </label>

        <input
          id="cuenta"
          ref={inputRef}
          className={`acceso__campo${completo ? ' acceso__campo--completo' : ''}${
            estado.tipo === 'error' ? ' acceso__campo--error' : ''
          }`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          maxLength={TOTAL_DIGITOS + 1}
          placeholder={formatear('0'.repeat(TOTAL_DIGITOS))}
          value={formatear(digitos)}
          onChange={manejarCambio}
          aria-describedby="ayuda estado"
          aria-invalid={estado.tipo === 'error'}
        />

        <p id="ayuda" className="acceso__ayuda">
          Escribe solo los números. El guion se agrega solo.
        </p>

        <button className="acceso__boton" type="submit" disabled={verificando}>
          {verificando ? 'Verificando…' : 'Registrar entrada'}
        </button>

        <p
          id="estado"
          className={`acceso__estado acceso__estado--${estado.tipo}`}
          role="status"
          aria-live="polite"
        >
          {estado.mensaje}
        </p>
      </form>
    </main>
  )
}

export default App