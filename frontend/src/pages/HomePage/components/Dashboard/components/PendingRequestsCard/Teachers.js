import axios from 'axios';
import { httpclientplugin_requestTeacher } from '../../../../../../Plugins/index.js';


export const fetchTeachers = async () => {
  try {
    const url= 'http://localhost:3000/api/teachers/pendientes-jus-per';
    const teachers = await httpclientplugin_requestTeacher.get(url);
    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}
export const fetchTeachers2 = async () => {
  try {
    const url= 'http://localhost:3000/api/teachers';
    const teachers = await httpclientplugin_requestTeacher.getList(url);
    console.log("Fetched teachers in fetchTeachers2:", teachers);
    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}
export const TEACHERS = await fetchTeachers(); 
console.log("TEACHERS loaded:", TEACHERS);

