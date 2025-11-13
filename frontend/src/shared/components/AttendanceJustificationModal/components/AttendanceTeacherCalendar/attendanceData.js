// attendanceData.js
// formato: { fecha: "YYYY-MM-DD", estado: <number> }
// estados: 1: Justificado, 2: Permiso, 3: Asistencia, 4: Falta, 5: Retardo

export const attendanceData = [
	{ fecha: "2025-11-01", estado: 3 },
	{ fecha: "2025-07-16", estado: 4 },
	{ fecha: "2025-11-02", estado: 4 }, // Falta (selectable if < today)
	{ fecha: "2025-11-03", estado: 1 },
	{ fecha: "2025-11-04", estado: 4 },
	{ fecha: "2025-11-05", estado: 2 },
	{ fecha: "2025-11-06", estado: 3 },
	{ fecha: "2025-11-07", estado: 4 },
	{ fecha: "2025-11-08", estado: 3 }, // Falta
	{ fecha: "2025-11-09", estado: 3 },
	{ fecha: "2025-11-10", estado: 5 },
	// agrega más fechas según necesites
];

export const schedule = {
	monday: ["math"],
	tuesday: ["science"],
	wednesday: ["history"],
	thursday: ["art"],
	friday: ["pe"],
	saturday: [],
	sunday: [],
};
