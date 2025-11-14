import { API_URL } from "../../../../../../utils/env";
import { httpclientplugin_requestTeacher } from "../../../../../../Plugins/index.js";


export const fechAusentTeachersList = async () => {
  try {
    const url = `${API_URL}/api/teachers/ausentes`;
    const ausentTeachersList = await httpclientplugin_requestTeacher.get_list_ausent_teachers(url);
    console.log("Ausent Teachers List:", ausentTeachersList);
    return ausentTeachersList;    
  } catch (error) {
    
  }
};
