/* validación de un texto según longitud dsps de eliminar espacios laterales. */
export function validarTexto(texto, minimo = 1, maximo = 100) {
  if (typeof texto !== "string") return false;
  const limpio = texto.trim();
  return limpio.length >= minimo && limpio.length <= maximo;
}

/* validación correo */
export function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const limpio = correo.trim().toLowerCase();
  if (limpio.length === 0 || limpio.length > 100) return false;

  const regexFormato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexFormato.test(limpio)) return false;

  return (
    limpio.endsWith("@duoc.cl") ||
    limpio.endsWith("@profesor.duoc.cl") ||
    limpio.endsWith("@gmail.com")
  );
}

/* validación run */
export function validarRun(run) {
  if (typeof run !== "string") return false;
  const limpio = run.trim();
  if (limpio.length < 7 || limpio.length > 9) return false;
  if (limpio.includes(".") || limpio.includes("-")) return false;

  // formato: números seguidos opcionalmente de 'k' o 'k'
  const regexRun = /^[0-9]+[0-9kK]$/;
  return regexRun.test(limpio);
}

/* validación contraseña */
export function validarPassword(password, min = 4, max = 10) {
  if (typeof password !== "string") return false;
  const limpia = password.trim();
  return limpia.length >= min && limpia.length <= max;
}

/* validación números */
export function validarNumeroPositivo(valor, permitirDecimal = false) {
  const num = Number(valor);
  if (isNaN(num) || num < 0) return false;
  if (!permitirDecimal && !Number.isInteger(num)) return false;
  return true;
}