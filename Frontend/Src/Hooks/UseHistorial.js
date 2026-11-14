import { useState } from 'react'
import { borrarAccesos, obtenerAccesos } from '../Services/Historial'
import { descargarPdfAccesos } from '../Services/Pdf'
import { fechaLocalISO, formatearFecha, formatearFechaCorta, formatearHora } from '../Utils/Fechas'

export function useHistorial() {
  const hoy = fechaLocalISO()
  const [accesos, setAccesos] = useState(obtenerAccesos)
  const [fecha, setFecha] = useState(hoy) // por defecto, el día actual

  // Solo los accesos de la fecha elegida, del más reciente al más antiguo.
  const filas = accesos
    .filter((acceso) => fechaLocalISO(new Date(acceso.fechaHora)) === fecha)
    .map((acceso) => ({
      ...acceso,
      fecha: formatearFecha(acceso.fechaHora),
      hora: formatearHora(acceso.fechaHora),
    }))

  function cambiarFecha(valor) {
    // Si borran la fecha en el campo, se vuelve a la de hoy.
    setFecha(valor || hoy)
  }

  function actualizar() {
    setAccesos(obtenerAccesos())
  }

  function borrar() {
    if (!window.confirm('¿Borrar TODO el historial de accesos (de todas las fechas)?')) return
    borrarAccesos()
    setAccesos([])
  }

  function descargarPdf() {
    // En el PDF van en orden de llegada: del primero al último del día.
    descargarPdfAccesos(fecha, [...filas].reverse())
  }

  return {
    fecha,
    hoy,
    esHoy: fecha === hoy,
    fechaTexto: formatearFechaCorta(fecha),
    filas,
    total: filas.length,
    cambiarFecha,
    irAHoy: () => setFecha(hoy),
    actualizar,
    borrar,
    descargarPdf,
  }
}