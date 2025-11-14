import { httpclientplugin_requestAttendanceData } from '../../../Plugins/index.js';
import { API_URL, } from '../../../utils/env.js';
import { getAuthHeader } from '../../../utils/Auth.js';

export const fetchAttendanceData = async (teacherId) => {
  try {
    const url = `${API_URL}/api/teachers/${teacherId}/attendance`;
    const attendanceData = await httpclientplugin_requestAttendanceData.get(url);
    return attendanceData || [];
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return [];
  }
};

/**
 * Descarga el reporte de asistencias usando el endpoint:
 * GET /api/reports/attendance?start=YYYY-MM-DD&end=YYYY-MM-DD[&id_maestro=123]
 * Si no se pasan start/end, intenta derivarlos a partir de los datos de asistencia del profesor.
 * Devuelve un objeto { ok, error } y dispara la descarga en el navegador cuando tenga éxito.
 */
export const fetchAttendanceDateRange = async (teacher_id = null, start = null, end = null) => {
  try {
    // Si no se dieron fechas, consultamos los registros para tomar el rango disponible
    if (!start || !end) {
      if (!teacher_id) {
        return { ok: false, error: 'teacher_id o fechas deben ser provistas' };
      }
      const attendance = await fetchAttendanceData(teacher_id);
      if (!attendance || attendance.length === 0) {
        return { ok: false, error: 'No hay registros de asistencia para este profesor' };
      }
      // asumimos que attendance está ordenado con la fecha más reciente en la posición 0
      const length = attendance.length;
      end = attendance[0].fecha;
      start = attendance[length - 1].fecha;
    }

    // Formatea la URL según la especificación solicitada
    const params = new URLSearchParams({ start, end });
    if (teacher_id) params.set('id_maestro', String(teacher_id));
    const url = `${API_URL}/api/reports/attendance?${params.toString()}`;

    const headers = { ...getAuthHeader(), Accept: '*/*' };
    const resp = await fetch(url, { method: 'GET', headers });
    if (!resp.ok) {
      const text = await resp.text().catch(() => null);
      console.error('Error al descargar reporte:', resp.status, text);
      return { ok: false, error: text || `HTTP ${resp.status}` };
    }

    const blob = await resp.blob();
    // Intenta inferir extensión a partir del content-type
    const contentType = resp.headers.get('Content-Type') || '';
    let ext = 'csv';
    if (contentType.includes('pdf')) ext = 'pdf';
    else if (contentType.includes('zip')) ext = 'zip';

    const filename = `asistencias_${start}_${end}.${ext}`;
    const urlObject = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlObject;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(urlObject);

    return { ok: true };
  } catch (error) {
    console.error('fetchAttendanceDateRange error:', error);
    return { ok: false, error: error?.message || String(error) };
  }
};

/**
 * Obtiene la foto del profesor desde el endpoint /api/teachers/{id}/photo
 * Devuelve { ok: true, url, blob } donde url es un object URL listo para usar en <img />
 * o { ok: false, error } en caso de fallo.
 */
export const fetchTeacherPhoto = async (teacher_id) => {
  try {
    if (!teacher_id) return { ok: false, error: 'teacher_id requerido' };
    const url = `${API_URL}/api/teachers/${teacher_id}/photo`;
    const headers = { ...getAuthHeader(), Accept: '*/*' };
    const resp = await fetch(url, { method: 'GET', headers });
    console.log("fetchTeacherPhoto response:", resp);
    if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        return { ok: false, error: text || `HTTP ${resp.status}` };
    
    }
    const contentType = resp.headers.get('Content-Type') || '';
    // Si el endpoint devuelve JSON (p.ej. { url: '...', image: 'base64...' }) lo parseamos
    if (contentType.includes('application/json')) {
      const json = await resp.json().catch(() => null);
      if (!json) return null;
      // Si el backend devuelve una URL pública a la imagen (campo 'src' o 'url')
      if (json.src) {
        const s = String(json.src);
        if (s.startsWith('/')) return `${API_URL}${s}`;
        return s;
      }
      if (json.url) {
        const u = String(json.url);
        if (u.startsWith('/')) return `${API_URL}${u}`;
        return u;
      }
      // Si el backend devuelve base64 en json.image
      if (json.image) {
        const mime = json.mime || 'image/png';
        return `data:${mime};base64,${json.image}`;
      }
      return null;
    }

    // Si es binario (imagen), creamos un object URL y devolvemos la URL como string
    const blob = await resp.blob();
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
  } catch (error) {
    console.error('fetchTeacherPhoto error:', error);
    return null;
  }
};


