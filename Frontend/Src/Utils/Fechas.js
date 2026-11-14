export function formatearFecha(fechaIso) {
  return new Date(fechaIso).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatearHora(fechaIso) {
  return new Date(fechaIso).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
// Fecha local en formato AAAA-MM-DD (el que usa el campo de fecha).
// No usa toISOString() porque eso da la fecha en UTC y puede salir un día corrido.
export function fechaLocalISO(fecha = new Date()) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

// '2026-11-14' -> '14/11/2026'
export function formatearFechaCorta(fechaInput) {
  const [anio, mes, dia] = fechaInput.split('-')
  return `${dia}/${mes}/${anio}`
}