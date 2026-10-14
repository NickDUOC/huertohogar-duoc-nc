const CLAVE_SESION = "usuarioActual";

/**
 * valida credenciales e inicia sesión.
 * soporta las credenciales oficiales de huertohogar (admin@duoc.cl / admin)
 * y las didácticas del tutorial docente (admin / admin123).
 */
export function iniciarSesion(usuario, password) {
  const usuarioLimpio = usuario.trim();
  const passwordLimpia = password.trim();

  // caso 1: administrador
  if (
    (usuarioLimpio === "admin@duoc.cl" && passwordLimpia === "admin") ||
    (usuarioLimpio === "admin" && passwordLimpia === "admin123")
  ) {
    const sesion = { usuario: usuarioLimpio, rol: "ADMIN" };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    return { exito: true, rol: "ADMIN", sesion };
  }

  // caso 2: cliente general válido (según reglas de dominio institucional o gmail)
  const esCorreoValido =
    usuarioLimpio.endsWith("@duoc.cl") ||
    usuarioLimpio.endsWith("@profesor.duoc.cl") ||
    usuarioLimpio.endsWith("@gmail.com");

  if (esCorreoValido && passwordLimpia.length >= 4 && passwordLimpia.length <= 10) {
    const sesion = { usuario: usuarioLimpio, rol: "CLIENTE" };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    return { exito: true, rol: "CLIENTE", sesion };
  }

  return { exito: false, error: "Credenciales incorrectas." };
}

/**
 * obtiene el objeto de sesión almacenado en localstorage.
 */
export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  } catch (error) {
    console.error("Error al leer sesión:", error);
    return null;
  }
}

/**
 * elimina la sesión activa de localstorage.
 */
export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

/**
 * revisa si existe un usuario autenticado
 */
export function estaAutenticado() {
  return obtenerSesion() !== null;
}

/**
 * revisa si el usuario autenticado tiene rol de admin
 */
export function esAdmin() {
  const sesion = obtenerSesion();
  return sesion?.rol === "ADMIN";
}

