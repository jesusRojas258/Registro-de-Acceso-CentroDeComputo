import { Link, NavLink, Outlet } from 'react-router-dom'
import { OPCIONES_ADMIN } from '../Config/MenuAdmin'
import { useMenuAdmin } from '../Hooks/UseMenuAdmin'
import './AdminLayout.css'

function AdminLayout() {
  const { abierto, alternar, cerrar } = useMenuAdmin()

  return (
    <div className="panel">
      <header className="panel__barra">
        <div className="panel__barra-interna">
          <p className="panel__marca">Centro de cómputo · Administración</p>

          <button
            className="panel__menu-boton"
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-admin"
            onClick={alternar}
          >
            {abierto ? 'Cerrar menú' : 'Menú'}
          </button>

          <nav
            id="menu-admin"
            className={`panel__nav${abierto ? ' panel__nav--abierto' : ''}`}
            aria-label="Administración"
          >
            <ul className="panel__lista">
              {OPCIONES_ADMIN.map((opcion) => (
                <li key={opcion.ruta}>
                  <NavLink
                    to={opcion.ruta}
                    end={opcion.fin}
                    onClick={cerrar}
                    className={({ isActive }) =>
                      `panel__enlace${isActive ? ' panel__enlace--activo' : ''}`
                    }
                  >
                    {opcion.texto}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link className="panel__salir" to="/" onClick={cerrar}>
              Pantalla de acceso
            </Link>
          </nav>
        </div>
      </header>

      <main className="panel__contenido">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout