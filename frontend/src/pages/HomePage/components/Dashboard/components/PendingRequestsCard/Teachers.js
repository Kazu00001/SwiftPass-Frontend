import axios from 'axios';
import { httpclientplugin_requestTeacher } from '../../../../../../Plugins/index.js';


export const fetchTeachers = async () => {
  try {
    const url= 'http://localhost:3000/api/teachers';
    const teachers = await httpclientplugin_requestTeacher.get(url);
    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}
export const TEACHERS = await fetchTeachers(); 

console.log(TEACHERS);  
