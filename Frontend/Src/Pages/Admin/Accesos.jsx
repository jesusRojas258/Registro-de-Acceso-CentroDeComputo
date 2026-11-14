import { useHistorial } from '../../Hooks/UseHistorial'
import './Accesos.css'

function Accesos() {
  const {
    fecha,
    hoy,
    esHoy,
    fechaTexto,
    filas,
    total,
    cambiarFecha,
    irAHoy,
    actualizar,
    borrar,
    descargarPdf,
  } = useHistorial()

  return (
    <section className="pagina">
      <h1 className="pagina__titulo">Historial de accesos</h1>
      <p className="pagina__texto">
        Alumnos que entraron al centro de cómputo en la fecha elegida, del más
        reciente al más antiguo.
      </p>

      <div className="historial__filtro">
        <label className="historial__campo" htmlFor="fecha-historial">
          Fecha
          <input
            id="fecha-historial"
            type="date"
            value={fecha}
            max={hoy}
            onChange={(e) => cambiarFecha(e.target.value)}
          />
        </label>

        <button
          className="historial__boton"
          type="button"
          onClick={irAHoy}
          disabled={esHoy}
        >
          Hoy
        </button>
      </div>

      <div className="historial__acciones">
        <button
          className="historial__boton historial__boton--principal"
          type="button"
          onClick={descargarPdf}
          disabled={total === 0}
        >
          Descargar PDF
        </button>
        <button className="historial__boton" type="button" onClick={actualizar}>
          Actualizar
        </button>
        <button className="historial__boton" type="button" onClick={borrar}>
          Borrar todo el historial
        </button>
      </div>

      <p className="historial__total">
        {total} {total === 1 ? 'acceso' : 'accesos'} el {fechaTexto}
      </p>

      <div className="historial__tabla-contenedor">
        <table className="historial__tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Número de cuenta</th>
              <th>Fecha</th>
              <th>Hora de entrada</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((acceso) => (
              <tr key={acceso.id}>
                <td>{acceso.nombre}</td>
                <td>{acceso.carrera}</td>
                <td className="historial__cuenta">{acceso.cuenta}</td>
                <td>{acceso.fecha}</td>
                <td>{acceso.hora}</td>
              </tr>
            ))}
            {filas.length === 0 && (
              <tr>
                <td colSpan="5">No hay accesos registrados en esta fecha.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Accesos