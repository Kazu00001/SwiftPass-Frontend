import {httpclientplugin_requestAttendanceData} from '../../../../../Plugins/index.js';
import {API_URL } from '../../../../../utils/env.js';

export const fetchAttendanceData = async(teacher_id) =>{
	console.log("Fetching attendance stats for teacher ID:", teacher_id);
	try {
		const url= `${API_URL}/api/teachers/${teacher_id}/estadistica-asistencias`;
		const attendanceStats = await httpclientplugin_requestAttendanceData.get_stats(url);
		return attendanceStats;
		
	} catch (error) {
		
	}
}

