import { TOTAL_DIGITOS } from '../../Utils/Cuenta'
import { MAX_FILAS_VISTA, UseCargarAlumnos } from '../../Hooks/UseCargarAlumnos'
import './CargarAlumnos.css'

const ETIQUETAS = {
  ok: 'Válida',
  invalida: 'No válida',
  repetida: 'Repetida',
}

function CargarAlumnos() {
  const {
    nombreArchivo,
    totalFilas,
    hayArchivo,
    conEncabezados,
    setConEncabezados,
    colCuenta,
    cambiarColCuenta,
    colNombre,
    setColNombre,
    soloProblemas,
    setSoloProblemas,
    cargando,
    error,
    mensaje,
    encabezados,
    alumnos,
    validos,
    invalidos,
    repetidos,
    visibles,
    manejarArchivo,
    guardar,
  } = UseCargarAlumnos()

  return (
    <div className="admin">
      <h1 className="admin__titulo">Cargar alumnos</h1>

      <section className="admin__seccion">
        <h2>1. Elige el archivo de la dirección</h2>
        <p className="admin__ayuda">Formatos compatibles: .csv y .xlsx</p>
        <input
          className="admin__archivo"
          type="file"
          accept=".csv,.xlsx"
          onChange={manejarArchivo}
          aria-label="Archivo con la lista de alumnos"
        />
        {cargando && <p className="admin__ayuda">Leyendo archivo…</p>}
        {error && (
          <p className="admin__mensaje admin__mensaje--error" role="alert">
            {error}
          </p>
        )}
      </section>

      {hayArchivo && (
        <section className="admin__seccion">
          <h2>2. Indica dónde está cada dato</h2>
          <p className="admin__ayuda">
            Archivo: {nombreArchivo} ({totalFilas} filas)
          </p>

          <div className="admin__ajustes">
            <label className="admin__campo">
              Columna del número de cuenta
              <select
                value={colCuenta}
                onChange={(e) => cambiarColCuenta(e.target.value)}
              >
                <option value="">Elige una columna</option>
                {encabezados.map((nombre, i) => (
                  <option key={i} value={i}>
                    {nombre}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin__campo">
              Columna del nombre (opcional)
              <select
                value={colNombre}
                onChange={(e) => setColNombre(e.target.value)}
              >
                <option value="">Ninguna</option>
                {encabezados.map((nombre, i) => (
                  <option key={i} value={i}>
                    {nombre}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin__check">
              <input
                type="checkbox"
                checked={conEncabezados}
                onChange={(e) => setConEncabezados(e.target.checked)}
              />
              La primera fila trae los títulos de las columnas
            </label>
          </div>
        </section>
      )}

      {hayArchivo && colCuenta === '' && (
        <p className="admin__mensaje">
          No se encontró sola la columna del número de cuenta. Elígela en la
          lista de arriba.
        </p>
      )}

      {hayArchivo && colCuenta !== '' && (
        <section className="admin__seccion">
          <h2>3. Revisa antes de guardar</h2>

          <p className="admin__resumen">
            <strong>{validos.length}</strong> válidas
            {' · '}
            <strong>{invalidos.length}</strong> no válidas
            {' · '}
            <strong>{repetidos.length}</strong> repetidas
          </p>
          <p className="admin__ayuda">
            Un número de cuenta válido tiene {TOTAL_DIGITOS} dígitos. Las filas
            no válidas o repetidas no se van a guardar.
          </p>

          <label className="admin__check">
            <input
              type="checkbox"
              checked={soloProblemas}
              onChange={(e) => setSoloProblemas(e.target.checked)}
            />
            Mostrar solo filas con problemas
          </label>

          <div className="admin__tabla-contenedor">
            <table className="admin__tabla">
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Cuenta</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((a) => (
                  <tr key={a.numeroFila}>
                    <td>{a.numeroFila}</td>
                    <td className="admin__cuenta">{a.cuenta ?? a.original}</td>
                    <td>{a.nombre}</td>
                    <td>
                      <span className={`admin__estado admin__estado--${a.estado}`}>
                        {ETIQUETAS[a.estado]}
                      </span>
                    </td>
                  </tr>
                ))}
                {visibles.length === 0 && (
                  <tr>
                    <td colSpan="4">No hay filas para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {alumnos.length > MAX_FILAS_VISTA && (
            <p className="admin__ayuda">
              Se muestran las primeras {MAX_FILAS_VISTA} filas. Se guardarán
              todas las válidas.
            </p>
          )}

          <button
            className="admin__boton"
            type="button"
            onClick={guardar}
            disabled={validos.length === 0}
          >
            Guardar {validos.length} {validos.length === 1 ? 'alumno' : 'alumnos'}
          </button>

          {mensaje && (
            <p className="admin__mensaje admin__mensaje--ok" role="status">
              {mensaje}
            </p>
          )}
        </section>
      )}
    </div>
  )
}

export default CargarAlumnos