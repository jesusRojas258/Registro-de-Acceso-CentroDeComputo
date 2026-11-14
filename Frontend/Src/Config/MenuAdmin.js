// Opciones del menú del administrador.
// "fin: true" hace que "Inicio" solo se marque cuando estás exactamente en /admin.
export const OPCIONES_ADMIN = [
  {
    ruta: '/admin',
    texto: 'Inicio',
    descripcion: 'Resumen del panel.',
    fin: true,
  },
  {
    ruta: '/admin/alumnos',
    texto: 'Cargar alumnos',
    descripcion: 'Registra alumnos a partir del archivo que manda la dirección.',
  },
  {
    ruta: '/admin/registrar',
    texto: 'Registrar alumno',
    descripcion: 'Agrega un alumno a mano con su cuenta, nombre y carrera.',
  },
  {
    ruta: '/admin/accesos',
    texto: 'Historial de accesos',
    descripcion: 'Consulta quién entró al centro de cómputo y a qué hora.',
  },
]