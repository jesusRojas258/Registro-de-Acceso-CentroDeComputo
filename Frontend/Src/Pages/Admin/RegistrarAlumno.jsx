import { TOTAL_DIGITOS, formatear } from '../../Utils/Cuenta'
import { useRegistrarAlumno } from '../../Hooks/UseRegistrarAlumno'
import './RegistrarAlumno.css'

function RegistrarAlumno() {
  const {
    valorCuenta,
    nombre,
    carrera,
    mensaje,
    alumnos,
    cuentaRef,
    cambiarCuenta,
    cambiarNombre,
    cambiarCarrera,
    guardar,
    quitar,
  } = useRegistrarAlumno()

  return (
    <section className="pagina">
      <h1 className="pagina__titulo">Registrar alumno</h1>
      <p className="pagina__texto">
        Agrega un alumno a mano. Desde que se guarda, ya puede entrar al centro
        de cómputo con su número de cuenta.
      </p>

      <form className="registro__form" onSubmit={guardar} noValidate>
        <label className="registro__campo">
          Número de cuenta
          <input
            ref={cuentaRef}
            className="registro__entrada registro__entrada--cuenta"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={TOTAL_DIGITOS + 1}
            placeholder={formatear('0'.repeat(TOTAL_DIGITOS))}
            value={valorCuenta}
            onChange={cambiarCuenta}
          />
        </label>

        <label className="registro__campo">
          Nombre completo
          <input
            className="registro__entrada"
            type="text"
            autoComplete="off"
            value={nombre}
            onChange={cambiarNombre}
          />
        </label>

        <label className="registro__campo">
          Carrera
          <input
            className="registro__entrada"
            type="text"
            autoComplete="off"
            value={carrera}
            onChange={cambiarCarrera}
          />
        </label>

        <button className="registro__boton" type="submit">
          Registrar alumno
        </button>

        <p
          className={`registro__mensaje registro__mensaje--${mensaje.tipo || 'vacio'}`}
          role={mensaje.tipo === 'error' ? 'alert' : 'status'}
        >
          {mensaje.texto}
        </p>
      </form>

      <h2 className="registro__subtitulo">Alumnos registrados a mano</h2>

      <div className="registro__tabla-contenedor">
        <table className="registro__tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Número de cuenta</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.cuenta}>
                <td>{alumno.nombre}</td>
                <td>{alumno.carrera}</td>
                <td className="registro__cuenta">{alumno.cuenta}</td>
                <td>
                  <button
                    className="registro__quitar"
                    type="button"
                    onClick={() => quitar(alumno)}
                    aria-label={`Quitar a ${alumno.nombre}`}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
            {alumnos.length === 0 && (
              <tr>
                <td colSpan="4">Todavía no has registrado alumnos a mano.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RegistrarAlumno