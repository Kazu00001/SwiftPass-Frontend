import React, { useEffect, useRef, useState } from "react";
import Styles from "./AttendanceCalendar.module.css";
import { fetchAttendanceData, fechtSchedule } from "./attendanceData.js";

const STATUS = {
	1: { label: "Justificado", color: "#e86666ff" },
	2: { label: "Permiso", color: "#3b82f6" },
	3: { label: "Inasistencia", color: "#ecd44dff" },
	4: { label: "Asistencia", color: "#f6a23bff" },
	5: { label: "Retardo", color: "#e1ec46ff" },
};

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

export default function AttendanceTeacherCalendar() {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);
	const [tooltip, setTooltip] = useState(null);
	const [loading, setLoading] = useState(false);
	const gridRef = useRef(null);
	const [schedule , setSchedule] = useState([]);
	const [attendanceData, setAttendanceData] = useState([]);


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

	useEffect(() => {
		let mounted = true;
		const loadSchedule = async () => {
			try {
				const res = await fechtSchedule();
				if (!mounted) return;
				setSchedule(res);
			} catch (err) {
				if (!mounted) return;
				setSchedule([]);
				console.error("Error loading schedule data:", err);
			}
		};
		loadSchedule();
		return () => {
			mounted = false;
		};
	}, []);		

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
			const record = (attendanceData || []).find((r) => r.fecha === date);
			const weekDay = DAYS_MAP[new Date(year, month - 1, d).getDay()];
			const hasClass = !!schedule[weekDay] && schedule[weekDay].length > 0;
			days.push({ day: d, date, estado: record?.estado ?? null, hasClass });
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

	const days = getDays();

	return (
		<div className={Styles.wrapper}>
			<header className={Styles.header}>
				<h2 className={Styles.month}>{monthName}</h2>

				<div className={Styles.legend}>
					{Object.values(STATUS).map((s) => (
						<div key={s.label} className={Styles.legendItem}>
							<div className={Styles.dotWrapper}>
								<span className={Styles.dot} style={{ background: s.color }} />
								<div className={Styles.tooltip}>{s.label}</div>
							</div>
						</div>
					))}
				</div>

				<div className={Styles.nav}>
					<button onClick={() => changeMonth(-1)}>◀</button>
					<button onClick={goToday}>Hoy</button>
					<button onClick={() => changeMonth(1)}>▶</button>
				</div>
			</header>

			{/* Días de la semana */}
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

			{/* Celdas del calendario */}
			<div className={Styles.grid} ref={gridRef}>
				{days.map((cell, i) =>
					cell ? (
						<div
							key={cell.date}
							className={`${Styles.day} ${
								!cell.hasClass ? Styles.disabledDay : ""
							}`}
							style={{
								background: cell.hasClass
									? STATUS[cell.estado]?.color || "#919191ff"
									: "#4b5563",
								cursor: "default",
							}}
						>
							<span>{cell.day}</span>
						</div>
					) : (
						<div key={`empty-${i}`} className={Styles.empty} />
					)
				)}
			</div>

			{/* 🧭 Tooltip flotante */}
			{tooltip && (
				<div
					className={Styles.tooltip}
					style={{ top: tooltip.top, left: tooltip.left }}
				>
					{tooltip.label}
				</div>
			)}
		</div>
	);
}
