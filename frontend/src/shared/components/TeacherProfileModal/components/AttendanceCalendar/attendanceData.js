import { API_URL } from "../../../../../utils/env";

import { httpclientplugin_requestAttendanceData } from "../../../../../Plugins/index.js";

export const fetchAttendanceData = async (teacherId) => {
  try {
    const url= `${API_URL}/api/teachers/${teacherId}/attendance`;
    const attendanceData = await httpclientplugin_requestAttendanceData.get(url);
    return attendanceData;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return [];
  }
}
export const fechtSchedule = async (teacherId) => {
  try {
    const url= `${API_URL}/api/teachers/${teacherId}/schedule`;
    const scheduleData = await httpclientplugin_requestAttendanceData.get_schedule(url);
    return scheduleData;
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return {};
  }
}

// export const schedule = {
//   monday: [
//     {
//       id: "C101",
//       nombre: "Matemáticas Discretas",
//       clave: "MATD-101",
//       lugar: "Aula 2B",
//     },
//     {
//       id: "C102",
//       nombre: "Programación Avanzada",
//       clave: "PROA-202",
//       lugar: "Laboratorio 3",
//     },
//   ],
//   tuesday: [
//     {
//       id: "C103",
//       nombre: "Base de Datos",
//       clave: "BD-201",
//       lugar: "Aula 1A",
//     },
//     {
//       id: "C104",
//       nombre: "Estructuras de Datos",
//       clave: "ED-203",
//       lugar: "Laboratorio 2",
//     },
//   ],
//   wednesday: [
//     {
//       id: "C105",
//       nombre: "Ingeniería de Software",
//       clave: "IS-301",
//       lugar: "Aula 4C",
//     },
//     {
//       id: "C106",
//       nombre: "Cálculo Integral",
//       clave: "CAL-102",
//       lugar: "Aula 2A",
//     },
//   ],
//   thursday: [
//     {
//       id: "C107",
//       nombre: "Diseño de Interfaces",
//       clave: "DI-204",
//       lugar: "Laboratorio 1",
//     },
//     {
//       id: "C108",
//       nombre: "Probabilidad y Estadística",
//       clave: "PYE-105",
//       lugar: "Aula 3B",
//     },
//   ],
//   friday: [
//     {
//       id: "C109",
//       nombre: "Sistemas Operativos",
//       clave: "SO-205",
//       lugar: "Laboratorio 4",
//     },
//     {
//       id: "C110",
//       nombre: "Redes de Computadoras",
//       clave: "RED-206",
//       lugar: "Aula 5C",
//     },
//   ],
// };