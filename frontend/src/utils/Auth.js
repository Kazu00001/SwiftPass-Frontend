// Helpers para autenticación y extracción de datos del JWT
// Evitamos añadir dependencias externas; usar funciones simples para decodificar

export function getAuthToken() {
  // intenta varias claves comunes en localStorage/sessionStorage y cookies
  if (typeof window === 'undefined') return null;
  const keys = [
    'token',
    'auth_token',
    'access_token',
    'jwt',
    'AUTH_TOKEN',
    'authToken',
    'accessToken',
  ];

  for (const k of keys) {
    try {
      const v = window.localStorage?.getItem(k) || window.sessionStorage?.getItem(k);
      if (v) return v;
    } catch (e) {
      // ignore storage read errors
    }
  }

  // intenta leer cookie con nombre token/auth_token
  try {
    const cookie = document?.cookie || '';
    const match = cookie.match(/(?:^|; )(?:(token|auth_token)=)([^;]+)/);
    if (match && match[2]) return match[2];
  } catch (e) {
    // ignore cookie errors
  }

  return null;
}

function safeBase64Decode(str) {
  try {
    // atob maneja base64; el payload puede contener chars UTF-8, usamos decodeURIComponent
    // https://developer.mozilla.org/en-US/docs/Glossary/Base64
    const decoded = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    try {
      // Manejar UTF-8
      return decodeURIComponent(
        decoded
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch (e) {
      return decoded;
    }
  } catch (err) {
    return null;
  }
}

/**
 * Decodifica el payload de un JWT y devuelve el objeto JSON o null.
 * Útil para depuración desde la consola: decodeJwtPayload(token)
 */
export function decodeJwtPayload(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payloadRaw = safeBase64Decode(parts[1]);
    if (!payloadRaw) return null;
    return JSON.parse(payloadRaw);
  } catch (err) {
    return null;
  }
}

export function getTeacherIdFromToken() {
  const token = getAuthToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) {
    console.warn('getTeacherIdFromToken: token found but payload could not be decoded');
    return null;
  }
  // claves comunes donde podría residir el id
  const id = payload?.id ?? payload?.sub ?? payload?.teacherId ?? payload?.userId ?? payload?.uid;
  return id != null ? String(id) : null;
}

export function getAuthHeader() {
  const t = getAuthToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export function setAuthToken(token, { persist = true } = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (persist) window.localStorage.setItem('token', token);
    else window.sessionStorage.setItem('token', token);
  } catch (err) {
    // storage puede fallar en privacidad o reglas del navegador
    console.warn('setAuthToken: storage failed', err);
  }
}

export function clearAuthToken() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
  } catch (err) {
    console.warn('clearAuthToken: storage failed', err);
  }
}

export default {
  getAuthToken,
  getTeacherIdFromToken,
  getAuthHeader,
  setAuthToken,
  clearAuthToken,
};
