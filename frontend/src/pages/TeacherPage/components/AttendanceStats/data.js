import { API_URL, getTeacherId } from "../../../../utils/env";
import { httpclientplugin_requestAttendanceData } from "../../../../Plugins/index.js";

export const fetchAttendanceData = async () => {
	try {
		const ID_TEACHER = getTeacherId();
		if (!ID_TEACHER) return null;
		const url = `${API_URL}/api/teachers/${ID_TEACHER}/estadistica-asistencias`;
		const attendanceStats = await httpclientplugin_requestAttendanceData.get_stats(url);
		return attendanceStats;
	} catch (error) {
		console.error("Error fetching attendance stats:", error);
		return null;
	}
};
