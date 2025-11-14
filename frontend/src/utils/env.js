import { getTeacherIdFromToken, getUserTypeFromToken } from './Auth.js';

// Devuelve el id del profesor actualmente en el JWT (o null)
export function getTeacherId() {
	try {
		return getTeacherIdFromToken();
	} catch (e) {
		return null;
	}
}

// Devuelve el tipo de usuario actual según el JWT (o null)
export function getTypeUser() {
	try {
		return getUserTypeFromToken();
	} catch (e) {
		return null;
	}
}

export const API_URL = "http://localhost:3000";