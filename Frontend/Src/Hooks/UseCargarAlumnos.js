import { useMemo, useState } from 'react'
import {
  EXTENSIONES_VALIDAS,
  contarColumnas,
  detectarColumnaCuenta,
  detectarColumnaNombre,
  leerArchivo,
  procesarAlumnos,
} from '../Services/Archivos'
import { guardarAlumnos } from '../Services/Api'

export const MAX_FILAS_VISTA = 100

export function UseCargarAlumnos() {
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [filas, setFilas] = useState([])
  const [conEncabezados, setConEncabezados] = useState(true)
  const [colCuenta, setColCuenta] = useState('')
  const [colNombre, setColNombre] = useState('')
  const [soloProblemas, setSoloProblemas] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const totalColumnas = useMemo(() => contarColumnas(filas), [filas])

  const encabezados = useMemo(
    () =>
      Array.from({ length: totalColumnas }, (_, i) =>
        conEncabezados && filas[0]?.[i] ? filas[0][i] : `Columna ${i + 1}`,
      ),
    [filas, totalColumnas, conEncabezados],
  )

  const datos = useMemo(
    () => (conEncabezados ? filas.slice(1) : filas),
    [filas, conEncabezados],
  )

  const alumnos = useMemo(() => {
    if (colCuenta === '') return []
    return procesarAlumnos(
      datos,
      Number(colCuenta),
      colNombre === '' ? null : Number(colNombre),
      conEncabezados,
    )
  }, [datos, colCuenta, colNombre, conEncabezados])

  const validos = alumnos.filter((a) => a.estado === 'ok')
  const invalidos = alumnos.filter((a) => a.estado === 'invalida')
  const repetidos = alumnos.filter((a) => a.estado === 'repetida')

  const visibles = (soloProblemas
    ? alumnos.filter((a) => a.estado !== 'ok')
    : alumnos
  ).slice(0, MAX_FILAS_VISTA)

  function cambiarColCuenta(valor) {
    setColCuenta(valor)
    setMensaje('')
  }

  async function manejarArchivo(e) {
    const archivo = e.target.files[0]
    e.target.value = '' // permite volver a elegir el mismo archivo
    if (!archivo) return

    setError('')
    setMensaje('')

    if (!EXTENSIONES_VALIDAS.test(archivo.name)) {
      setError('Formato no compatible. Usa un archivo .csv o .xlsx.')
      return
    }

    setCargando(true)
    let leidas
    try {
      leidas = await leerArchivo(archivo)
    } catch {
      setCargando(false)
      setError('No se pudo leer el archivo. Revisa que no esté dañado.')
      return
    }
    setCargando(false)

    if (leidas.length === 0) {
      setError('El archivo está vacío.')
      return
    }

    const cuenta = detectarColumnaCuenta(leidas)
    const nombre = detectarColumnaNombre(leidas, cuenta)

    setFilas(leidas)
    setNombreArchivo(archivo.name)
    setConEncabezados(true)
    setColCuenta(cuenta >= 0 ? String(cuenta) : '')
    setColNombre(nombre >= 0 ? String(nombre) : '')
  }

  async function guardar() {
    await guardarAlumnos(validos.map((a) => ({ cuenta: a.cuenta, nombre: a.nombre })))
    setMensaje(
      `${validos.length} alumnos listos para guardar. Falta conectar con el backend.`,
    )
  }

  return {
    nombreArchivo,
    totalFilas: filas.length,
    hayArchivo: filas.length > 0,
    conEncabezados,
    setConEncabezados,
    colCuenta,
    cambiarColCuenta,
    colNombre,
    setColNombre,
    soloProblemas,
    setSoloProblemas,
    cargando,
    error,
    mensaje,
    encabezados,
    alumnos,
    validos,
    invalidos,
    repetidos,
    visibles,
    manejarArchivo,
    guardar,
  }
}