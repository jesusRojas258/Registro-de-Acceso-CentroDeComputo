import Papa from 'papaparse'
import readXlsxFile from 'read-excel-file'
import { normalizarCuenta } from '../Utils/Cuenta'

export const EXTENSIONES_VALIDAS = /\.(csv|xlsx)$/i

// Lee un CSV. Prueba UTF-8 y, si falla (típico de Excel en español), Windows-1252.
async function leerCsv(archivo) {
  const buffer = await archivo.arrayBuffer()
  let texto
  try {
    texto = new TextDecoder('utf-8', { fatal: true }).decode(buffer)
  } catch {
    texto = new TextDecoder('windows-1252').decode(buffer)
  }
  return Papa.parse(texto, { skipEmptyLines: true }).data
}

// Devuelve las filas del archivo como texto limpio y sin filas vacías.
export async function leerArchivo(archivo) {
  const crudas = /\.csv$/i.test(archivo.name)
    ? await leerCsv(archivo)
    : await readXlsxFile(archivo)

  return crudas
    .map((fila) => fila.map((celda) => (celda == null ? '' : String(celda).trim())))
    .filter((fila) => fila.some((celda) => celda !== ''))
}

export function contarColumnas(filas) {
  return filas.reduce((max, fila) => Math.max(max, fila.length), 0)
}

// Busca la columna donde la mayoría de los valores parecen números de cuenta.
// Devuelve -1 si no encuentra ninguna.
export function detectarColumnaCuenta(filas) {
  const totalColumnas = contarColumnas(filas)
  let mejor = -1
  let mejorPuntaje = 0
  for (let c = 0; c < totalColumnas; c++) {
    const llenas = filas.filter((f) => f[c])
    if (llenas.length === 0) continue
    const buenas = llenas.filter((f) => normalizarCuenta(f[c])).length
    const puntaje = buenas / llenas.length
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje
      mejor = c
    }
  }
  return mejorPuntaje >= 0.5 ? mejor : -1
}

// Busca en la primera fila una columna cuyo título diga "nombre".
// Devuelve -1 si no encuentra ninguna.
export function detectarColumnaNombre(filas, colCuenta) {
  return filas[0].findIndex((celda, i) => i !== colCuenta && /nombre/i.test(celda))
}

// Convierte las filas en alumnos y marca cada uno como:
// 'ok', 'invalida' (no tiene los dígitos correctos) o 'repetida'.
export function procesarAlumnos(datos, colCuenta, colNombre, conEncabezados) {
  const vistas = new Set()
  return datos.map((fila, i) => {
    const original = fila[colCuenta] ?? ''
    const cuenta = normalizarCuenta(original)
    const nombre = colNombre === null ? '' : (fila[colNombre] ?? '')

    let estado = 'ok'
    if (!cuenta) estado = 'invalida'
    else if (vistas.has(cuenta)) estado = 'repetida'
    else vistas.add(cuenta)

    return {
      numeroFila: i + (conEncabezados ? 2 : 1),
      original,
      cuenta,
      nombre,
      estado,
    }
  })
}