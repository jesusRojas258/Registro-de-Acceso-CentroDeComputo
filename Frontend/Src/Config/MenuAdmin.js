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
    ruta: '/admin/accesos',
    texto: 'Historial de accesos',
    descripcion: 'Consulta quién entró al centro de cómputo y a qué hora.',
  },
]