const CLAVE = 'Alumnos-Registrados'

// Alumno de prueba que siempre puede entrar. No se puede quitar desde el panel.
const ALUMNOS_DEMO = [
  {
    cuenta: '1234567-8',
    nombre: 'Alumno de Prueba',
    carrera: 'Ingeniería en Sistemas Computacionales',
  },
]

// Alumnos registrados a mano, del más reciente al más antiguo.
export function obtenerAlumnos() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

// Busca un alumno por su cuenta (de prueba o registrado). Devuelve null si no existe.
export function buscarAlumno(cuenta) {
  return (
    [...ALUMNOS_DEMO, ...obtenerAlumnos()].find((alumno) => alumno.cuenta === cuenta) ?? null
  )
}

// Agrega un alumno. Devuelve { ok: true } o { ok: false } si la cuenta ya existe.
// TODO: cuando exista el backend, esto será un POST a /api/alumnos.
export function agregarAlumno(alumno) {
  if (buscarAlumno(alumno.cuenta)) return { ok: false }
  try {
    localStorage.setItem(CLAVE, JSON.stringify([alumno, ...obtenerAlumnos()]))
  } catch {
    return { ok: false }
  }
  return { ok: true }
}

export function eliminarAlumno(cuenta) {
  try {
    const restantes = obtenerAlumnos().filter((alumno) => alumno.cuenta !== cuenta)
    localStorage.setItem(CLAVE, JSON.stringify(restantes))
  } catch {
    // Sin acción.
  }
}