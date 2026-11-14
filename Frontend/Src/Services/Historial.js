const CLAVE = 'Historial-Accesos'

// Devuelve los accesos guardados, del más reciente al más antiguo.
export function obtenerAccesos() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

// Guarda un acceso con la fecha y hora actuales y devuelve el registro.
// TODO: cuando exista el backend, esto será un POST a /api/accesos.
export function guardarAcceso(alumno) {
  const registro = {
    id: Date.now(),
    cuenta: alumno.cuenta,
    nombre: alumno.nombre,
    carrera: alumno.carrera,
    fechaHora: new Date().toISOString(),
  }
  try {
    localStorage.setItem(CLAVE, JSON.stringify([registro, ...obtenerAccesos()]))
  } catch {
    // Si el navegador no deja guardar, el acceso se muestra igual.
  }
  return registro
}

export function borrarAccesos() {
  try {
    localStorage.removeItem(CLAVE)
  } catch {
    // Sin acción.
  }
}