import axios from "axios";

export const httpclientplugin_requestTeacher = {
    get: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data.pendientes;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            return [];
        }
    },
    getList: async (url) => {
        try {
            const response = await axios.get(url);
            console.log("Response from getList:", response);
            return response.data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
            return [];
        }
    },
    get_teacher_permissions_and_justi: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data.records.list;
        } catch (error) {
            console.error('Error fetching teacher permissions:', error);
            return {};
        }
    },
    get_list_ausent_teachers: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data.ausentes;
        } catch (error) {
            console.error('Error fetching absent teachers list:', error);
            return [];
        }
    },
    post: async (u) => {
        throw new Error('Not implemented');
    },
    put: async (teacherData) => {
       throw new Error('Not implemented');
    },
     delete: async (teacherData) => {
       throw new Error('Not implemented');
    }

}