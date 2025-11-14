

import { getAuthHeader } from '../../../utils/Auth.js';
import { API_URL } from '../../../utils/env.js';

/**
 * Approve or reject a teacher record (permiso/justificante).
 * @param {number|string} id_record
 * @param {string} type - 'permiso' | 'justificante' (backend expects lowercase)
 * @param {number|string} teacher_id
 * @param {number} approve_status - 1 = approve, 0 = reject
 * @returns {Promise<{ok:boolean, data?:any, error?:any, status?:number}>}
 */
export const asseptPermisoOJustificante = async (id_record, type, teacher_id, approve_status = 1) => {
    try {
        const url = `${API_URL}/api/teachers/record/approve`;
        const payload = {
            id_record: Number(id_record),
            type: String(type).toLowerCase(),
            teacher_id: Number(teacher_id),
            approve_status: Number(approve_status),
        };

        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        };

        const res = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(payload),
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
            return { ok: false, status: res.status, error: json || `HTTP ${res.status}` };
        }

        return { ok: true, data: json };
    } catch (error) {
        console.error('asseptPermiso error', error);
        return { ok: false, error: error.message || error };
    }
};