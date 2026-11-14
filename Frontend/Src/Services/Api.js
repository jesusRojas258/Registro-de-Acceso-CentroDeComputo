import { buscarAlumno } from './Alumnos'

// Devuelve los datos del alumno si tiene acceso, o null si no.
// TODO: reemplazar por la llamada real al backend, por ejemplo:
//   const res = await fetch('http://localhost:3000/api/accesos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ cuenta }),
//   })
//   const datos = await res.json()
//   return datos.ingreso ? datos.alumno : null
export async function verificarAcceso(cuenta) {
  return buscarAlumno(cuenta)
}

// TODO: reemplazar por la llamada real al backend, por ejemplo:
//   await fetch('http://localhost:3000/api/alumnos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ alumnos }),
//   })
export async function guardarAlumnos(alumnos) {
  console.log('Alumnos a guardar:', alumnos)
}