import axios from "axios";

export const httpclientplugin_requestTeacher = {
    get: async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching teachers:', error);
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