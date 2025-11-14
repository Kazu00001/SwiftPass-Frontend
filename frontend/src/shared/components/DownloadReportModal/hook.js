import { API_URL } from '../../../utils/env.js';
import { getAuthHeader } from '../../../utils/Auth.js';

/**
 * Genera y descarga el reporte de asistencias para un rango de fechas.
 * Llama a: GET /api/reports/attendance?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Devuelve { ok: true } al completar la descarga o { ok:false, error } en caso de fallo.
 */
export const fetchReportByDateRange = async (start, end) => {
  try {
    if (!start || !end) return { ok: false, error: 'start y end son requeridos' };

    const params = new URLSearchParams({ start, end });
    const url = `${API_URL}/api/reports/attendance?${params.toString()}`;

    const headers = { ...getAuthHeader(), Accept: '*/*' };
    const resp = await fetch(url, { method: 'GET', headers });
    if (!resp.ok) {
      const text = await resp.text().catch(() => null);
      console.error('Error al descargar reporte:', resp.status, text);
      return { ok: false, error: text || `HTTP ${resp.status}` };
    }

    const blob = await resp.blob();
    const contentType = resp.headers.get('Content-Type') || '';
    let ext = 'csv';
    if (contentType.includes('pdf')) ext = 'pdf';
    else if (contentType.includes('zip')) ext = 'zip';

    const filename = `reporte_asistencias_${start}_${end}.${ext}`;
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
    console.error('fetchReportByDateRange error:', error);
    return { ok: false, error: error?.message || String(error) };
  }
};


