const data = [
	// 13 asistencias (3)
	...Array(13).fill({ status: 3 }),
	// 3 faltas (4)
	...Array(3).fill({ status: 4 }),
	// 4 retardos (5)
	...Array(4).fill({ status: 5 }),
	// 2 justificados (1)
	...Array(2).fill({ status: 1 }),
	// 3 permisos (2)
	...Array(3).fill({ status: 2 }),
];

export default data;
