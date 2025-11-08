import axios from "axios";
export const httpclientplugin_requestAttendanceData = {
    get: async (url) => {
        try {
            const response = await axios.get(url); 
            return response.data.attendance;
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            return [];
        }
    },
    get_schedule: async (url) => {
        try {
            const response = await axios.get(url); 
            return response.data.schedule;
        } catch (error) {
            console.error('Error fetching schedule data:', error);
            return {};
        }
    },
    getHistory: async (url) => {
        try {
            const response = await axios.get(url); 
            return response.data;
        } catch (error) {
            console.error('Error fetching attendance history data:', error);
            return [];
        }
    },
    post: async (u) => {
        throw new Error('Not implemented');
    },
    put_changeDayStatus: async (url,body) => {
        try {
            const response = await axios.put(url, body); 
            return response.data;

        } catch (error) {
            console.error('Error updating attendance data:', error);
            throw error;
        }
    },
     delete: async (attendanceData) => {
       throw new Error('Not implemented');
    }

}   