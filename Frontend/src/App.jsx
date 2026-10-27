import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Acceso from './Pages/Acceso'
import AdminLayout from './Components/AdminLayout'
import Inicio from './Pages/Admin/Inicio'
import CargarAlumnos from './Pages/Admin/CargarAlumnos'
import Accesos from './Pages/Admin/Accesos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceso />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Inicio />} />
          <Route path="alumnos" element={<CargarAlumnos />} />
          <Route path="accesos" element={<Accesos />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App