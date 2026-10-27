import '../App.css'
import { TOTAL_DIGITOS, formatear } from '../Utils/Cuenta'
import { SEGUNDOS_RESULTADO, useAcceso } from '../Hooks/UseAcceso'

function Acceso() {
  const {
    valorCampo,
    completo,
    estado,
    verificando,
    resultado,
    inputRef,
    manejarCambio,
    manejarEnvio,
  } = useAcceso()

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
          value={valorCampo}
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

export default Acceso