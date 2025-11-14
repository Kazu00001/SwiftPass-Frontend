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

