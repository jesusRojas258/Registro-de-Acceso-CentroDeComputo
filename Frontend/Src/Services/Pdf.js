import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatearFechaCorta } from '../Utils/Fechas'

// Genera y descarga el PDF con los accesos de una fecha.
// "fecha" viene como AAAA-MM-DD y "filas" ya traen fecha y hora formateadas.
export function descargarPdfAccesos(fecha, filas) {
  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(16)
  doc.text('Registro de accesos - Centro de cómputo', 14, 18)
  doc.setFontSize(11)
  doc.text(`Fecha: ${formatearFechaCorta(fecha)}`, 14, 26)
  doc.text(`Total de accesos: ${filas.length}`, 14, 32)

  autoTable(doc, {
    startY: 38,
    head: [['Nombre', 'Carrera', 'Número de cuenta', 'Fecha', 'Hora de entrada']],
    body: filas.map((a) => [a.nombre, a.carrera, a.cuenta, a.fecha, a.hora]),
    headStyles: { fillColor: [16, 36, 62] },
    styles: { fontSize: 10 },
  })

  doc.save(`Registro-Accesos-${fecha}.pdf`)
}