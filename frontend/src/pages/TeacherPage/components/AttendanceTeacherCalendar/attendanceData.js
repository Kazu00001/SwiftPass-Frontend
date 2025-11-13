import { API_URL, ID_TEACHER } from "../../../../utils/env.js";

import { httpclientplugin_requestAttendanceData } from "../../../../Plugins/index.js";
export const fetchAttendanceData = async () => {
  try {
    const url= `${API_URL}/api/teachers/${ID_TEACHER}/attendance`;
    const attendanceData = await httpclientplugin_requestAttendanceData.get(url);
    return attendanceData;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return [];
  }
}
export const fechtSchedule = async () => {
  try {
    const url= `${API_URL}/api/teachers/${ID_TEACHER}/schedule`;
    const scheduleData = await httpclientplugin_requestAttendanceData.get_schedule(url);
    return scheduleData;
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return {};
  }
}