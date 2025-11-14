

import { API_URL, getTeacherId } from "../../../../../utils/env.js";

import { httpclientplugin_requestAttendanceData } from "../../../../../Plugins/index.js";
export const fetchAttendanceData = async () => {
	const ID_TEACHER = getTeacherId();
	console.log("Fetching attendance data for teacher ID: --- ", ID_TEACHER);
	if (!ID_TEACHER) return [];
	try {
		const url = `${API_URL}/api/teachers/${ID_TEACHER}/attendance`;
		console.log("Attendance data URL:", url);
		const attendanceData = await httpclientplugin_requestAttendanceData.get(url);

		return attendanceData;
	} catch (error) {
		console.error("Error fetching attendance data:", error);
		return [];
	}
};
export const fechtSchedule = async () => {
	const ID_TEACHER = getTeacherId();
	if (!ID_TEACHER) return {};
	try {
		const url = `${API_URL}/api/teachers/${ID_TEACHER}/schedule`;
		const scheduleData = await httpclientplugin_requestAttendanceData.get_schedule(url);
		return scheduleData;
	} catch (error) {
		console.error("Error fetching schedule data:", error);
		return {};
	}
};

