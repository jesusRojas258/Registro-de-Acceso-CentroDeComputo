import { Link } from 'react-router-dom'
import { OPCIONES_ADMIN } from '../../Config/MenuAdmin'

function Inicio() {
  const opciones = OPCIONES_ADMIN.filter((opcion) => !opcion.fin)

  return (
    <section className="pagina">
      <h1 className="pagina__titulo">Panel del administrador</h1>
      <p className="pagina__texto">Elige qué quieres hacer.</p>

      <ul className="pagina__opciones">
        {opciones.map((opcion) => (
          <li key={opcion.ruta}>
            <Link to={opcion.ruta}>
              <strong>{opcion.texto}</strong>
              {opcion.descripcion}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Inicio