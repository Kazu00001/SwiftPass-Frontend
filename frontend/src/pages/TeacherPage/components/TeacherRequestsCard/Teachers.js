import { httpclientplugin_requestTeacher } from '../../../../Plugins/index.js';
import { getTeacherId } from '../../../../utils/env.js';



export const fetchTeachers = async () => {
  const ID_TEACHER = getTeacherId();
  console.log("Fetching teachers for ID_TEACHER:", ID_TEACHER);
  if (!ID_TEACHER) return [];
  try {
    const url = `http://localhost:3000/api/teachers/${ID_TEACHER}/listar-permisos-justificantes`;
    const teachers = await httpclientplugin_requestTeacher.get_teacher_permissions_and_justi(url);

    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};
// Preferir cargar los profesores desde los componentes (useEffect) usando fetchTeachers().
// Evitamos top-level await para prevenir problemas de orden de evaluación o ciclos de importación.

