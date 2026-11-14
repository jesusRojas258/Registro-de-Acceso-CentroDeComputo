import { useRef, useState } from 'react'
import { TOTAL_DIGITOS, formatear } from '../Utils/Cuenta'
import { agregarAlumno, eliminarAlumno, obtenerAlumnos } from '../Services/Alumnos'

export function useRegistrarAlumno() {
  const [digitos, setDigitos] = useState('')
  const [nombre, setNombre] = useState('')
  const [carrera, setCarrera] = useState('')
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
  const [alumnos, setAlumnos] = useState(obtenerAlumnos)
  const cuentaRef = useRef(null)

  function limpiarMensaje() {
    setMensaje({ tipo: '', texto: '' })
  }

  function cambiarCuenta(e) {
    // Solo números; el guion lo agrega la pantalla.
    setDigitos(e.target.value.replace(/\D/g, '').slice(0, TOTAL_DIGITOS))
    limpiarMensaje()
  }

  function cambiarNombre(e) {
    setNombre(e.target.value)
    limpiarMensaje()
  }

  function cambiarCarrera(e) {
    setCarrera(e.target.value)
    limpiarMensaje()
  }

  function guardar(e) {
    e.preventDefault()

    const nombreLimpio = nombre.trim().replace(/\s+/g, ' ')
    const carreraLimpia = carrera.trim().replace(/\s+/g, ' ')

    if (digitos.length !== TOTAL_DIGITOS) {
      setMensaje({
        tipo: 'error',
        texto: `El número de cuenta lleva ${TOTAL_DIGITOS} dígitos.`,
      })
      cuentaRef.current?.focus()
      return
    }
    if (!nombreLimpio) {
      setMensaje({ tipo: 'error', texto: 'Escribe el nombre del alumno.' })
      return
    }
    if (!carreraLimpia) {
      setMensaje({ tipo: 'error', texto: 'Escribe la carrera del alumno.' })
      return
    }

    const cuenta = formatear(digitos)
    const resultado = agregarAlumno({ cuenta, nombre: nombreLimpio, carrera: carreraLimpia })

    if (!resultado.ok) {
      setMensaje({ tipo: 'error', texto: `Ya existe un alumno con la cuenta ${cuenta}.` })
      cuentaRef.current?.focus()
      return
    }

    setAlumnos(obtenerAlumnos())
    setDigitos('')
    setNombre('')
    setCarrera('')
    setMensaje({ tipo: 'ok', texto: `Alumno ${nombreLimpio} registrado con la cuenta ${cuenta}.` })
    cuentaRef.current?.focus()
  }

  function quitar(alumno) {
    if (!window.confirm(`¿Quitar a ${alumno.nombre} (${alumno.cuenta})? Ya no podrá entrar.`)) return
    eliminarAlumno(alumno.cuenta)
    setAlumnos(obtenerAlumnos())
  }

  return {
    valorCuenta: formatear(digitos),
    nombre,
    carrera,
    mensaje,
    alumnos,
    cuentaRef,
    cambiarCuenta,
    cambiarNombre,
    cambiarCarrera,
    guardar,
    quitar,
  }
}