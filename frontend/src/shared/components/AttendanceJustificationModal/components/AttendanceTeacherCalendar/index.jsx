import React, { useEffect, useState } from "react";
import Styles from "./AttendanceCalendar.module.css";
import { fetchAttendanceData, fechtSchedule } from "./attendanceData.js";

/*
  Estados en attendanceData:
  1 = Justificado
  2 = Permiso
  3 = Asistencia
  4 = Falta
  5 = Retardo
*/

const formatDate = (y, m, d) =>
	`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const DAYS_MAP = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

export default function AttendanceTeacherCalendar({

	selectedDays = [],
	onSelectionChange = () => {},
}) {
	const [schedule , setSchedule] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		let mounted = true;
		const loadSchedule = async () => {
			try {
				const res = await fechtSchedule();
				if (!mounted) return;
				setSchedule(res || {});
			} catch (err) {
				if (!mounted) return;
				setSchedule({});
				console.error("Error loading schedule data:", err);
			}
		};
		loadSchedule();
		return () => {
			mounted = false;
		};
	}, []);
	const [	attendanceData, setAttendanceData] = useState([]);
	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				const res = await fetchAttendanceData();
				if (!mounted) return;
				setAttendanceData(Array.isArray(res) ? res : []);
			} catch (err) {
				if (!mounted) return;
				setAttendanceData([]);
				console.error("Error loading attendance data:", err);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		load();
		return () => {
			mounted = false;
		};
	}, []);
	console.log("🗓️ attendanceData cargado:", attendanceData)
	console.log("🗓️ schedule cargado:", schedule)
	const today = new Date();
	const todayDate = formatDate(
		today.getFullYear(),
		today.getMonth() + 1,
		today.getDate()
	);

	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);
	const data = attendanceData || [];
	const [mode, setMode] = useState("justificacion"); // Siempre inicia con un modo activo

	useEffect(() => {
		console.log("🗓️ Días seleccionados (desde props):", selectedDays);
		console.log("🔧 Modo actual:", mode);
	}, [selectedDays, mode]);

	const monthName = new Date(year, month - 1).toLocaleString("es-ES", {
		month: "long",
		year: "numeric",
	});

	const getDays = () => {
		const first = new Date(year, month - 1, 1);
		const totalDays = new Date(year, month, 0).getDate();
		const offset = first.getDay();
		const days = Array(offset).fill(null);

		for (let d = 1; d <= totalDays; d++) {
			const date = formatDate(year, month, d);
			const record = data.find((r) => r.fecha === date);
			const weekDay = DAYS_MAP[new Date(year, month - 1, d).getDay()];
			const hasClass = !!schedule[weekDay] && schedule[weekDay].length > 0;

			days.push({
				day: d,
				date,
				estado: record?.estado ?? null,
				hasClass,
			});
		}

		while (days.length % 7 !== 0) days.push(null);
		return days;
	};

	const changeMonth = (dir) => {
		const newMonth = month + dir;
		if (newMonth < 1) {
			setMonth(12);
			setYear((y) => y - 1);
		} else if (newMonth > 12) {
			setMonth(1);
			setYear((y) => y + 1);
		} else setMonth(newMonth);
	};

	const goToday = () => {
		setYear(today.getFullYear());
		setMonth(today.getMonth() + 1);
	};

	const isCellSelectable = (cell) => {
		if (!cell || !cell.date || !cell.hasClass) return false;

		if (mode === "justificacion") return cell.estado === 3;
		if (mode === "permiso") return cell.date > todayDate;
		return false;
	};

	const toggleSelect = (cell) => {
		if (!cell || !cell.date) return;
		if (!isCellSelectable(cell)) return;

		const newSelection = selectedDays.includes(cell.date)
			? selectedDays.filter((d) => d !== cell.date)
			: [...selectedDays, cell.date];

		onSelectionChange(newSelection);
	};

	// 🔹 Cambia el modo y limpia las selecciones
	const handleModeChange = (newMode) => {
		if (newMode === mode) return; // Evita desactivar ambos
		setMode(newMode);
		onSelectionChange([]); // Limpia los días seleccionados
	};

	const days = getDays();

	return (
		<div className={Styles.wrapper}>
			<header className={Styles.header}>
				<h2 className={Styles.month}>{monthName}</h2>

				{/* 🔹 Botones justo antes del nav */}
				<div className={Styles.actions}>
					<button
						className={`${Styles.modeButton} ${
							mode === "justificacion" ? Styles.activeMode : ""
						}`}
						onClick={() => handleModeChange("justificacion")}
					>
						Justificación
					</button>

					<button
						className={`${Styles.modeButton} ${
							mode === "permiso" ? Styles.activeMode : ""
						}`}
						onClick={() => handleModeChange("permiso")}
					>
						Permiso
					</button>

					<div className={Styles.nav}>
						<button onClick={() => changeMonth(-1)}>◀</button>
						<button onClick={goToday}>Hoy</button>
						<button onClick={() => changeMonth(1)}>▶</button>
					</div>
				</div>
			</header>

			<div className={Styles.weekdays}>
				{["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, i) => {
					const key = DAYS_MAP[i];
					const hasClass = !!schedule[key] && schedule[key].length > 0;
					return (
						<div
							key={d}
							className={`${Styles.weekday} ${
								hasClass ? Styles.activeDay : Styles.inactiveDay
							}`}
						>
							{d}
						</div>
					);
				})}
			</div>

			<div className={Styles.grid}>
				{days.map((cell, i) =>
					cell ? (
						<div
							key={cell.date}
							onClick={() => toggleSelect(cell)}
							className={`${Styles.day} ${
								!isCellSelectable(cell)
									? Styles.disabledDay
									: Styles.selectableDay
							} ${selectedDays.includes(cell.date) ? Styles.selectedDay : ""}`}
							title={
								cell.estado
									? {
											1: "Justificado",
											2: "Permiso",
											4: "Asistencia",
											3: "Falta",
											5: "Retardo",
									  }[cell.estado]
									: ""
							}
						>
							<span>{cell.day}</span>
						</div>
					) : (
						<div key={`empty-${i}`} className={Styles.empty} />
					)
				)}
			</div>
		</div>
	);
}
