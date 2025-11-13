import { API_URL, ID_TEACHER } from "../../../../utils/env";
import {httpclientplugin_requestAttendanceData} from '../../../../Plugins/index.js';

export const fetchAttendanceData = async() =>{
	try {
		const url= `${API_URL}/api/teachers/${ID_TEACHER}/estadistica-asistencias`;
		const attendanceStats = await httpclientplugin_requestAttendanceData.get_stats(url);
		return attendanceStats;
		
	} catch (error) {
		
	}
}
