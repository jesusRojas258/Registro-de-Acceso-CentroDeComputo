// Cuentas de prueba para poder ver la pantalla verde.
// Cualquier otra cuenta mostrará la pantalla roja.
const CUENTAS_DEMO = ['1234567-8']

// TODO: reemplazar por la llamada real al backend, por ejemplo:
//   const res = await fetch('http://localhost:3000/api/accesos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ cuenta }),
//   })
//   const datos = await res.json()
//   return datos.ingreso   // true o false
export async function verificarAcceso(cuenta) {
  return CUENTAS_DEMO.includes(cuenta)
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