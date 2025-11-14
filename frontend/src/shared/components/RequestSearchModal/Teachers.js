import { API_URL } from "../../../utils/env";
import { httpclientplugin_requestTeacher } from "../../../Plugins/index.js";

export const fetchHistoryTeachersList = async () => {
	try {
		const url = `${API_URL}/api/teachers/pendientes-uapro-jus-per`;
		const historyTeachersList = await httpclientplugin_requestTeacher.getList(url);
		return historyTeachersList?.pendientes ?? [];
	} catch (error) {
		console.error("fetchHistoryTeachersList error", error);
		return [];
	}
};
