// Cantidad de dígitos del número de cuenta (sin contar el guion).
// Con 8 dígitos el formato es 1234567-8. Si necesitas 9, cambia este valor.
export const TOTAL_DIGITOS = 8

// Pone el guion antes del último dígito: 12345678 -> 1234567-8
export function formatear(digitos) {
  if (digitos.length < TOTAL_DIGITOS) return digitos
  return `${digitos.slice(0, TOTAL_DIGITOS - 1)}-${digitos.slice(TOTAL_DIGITOS - 1)}`
}

// Recibe texto o número (1234567-8, 12345678, "1234 5678"...).
// Devuelve la cuenta con formato, o null si no es válida.
export function normalizarCuenta(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '')
  return digitos.length === TOTAL_DIGITOS ? formatear(digitos) : null
}