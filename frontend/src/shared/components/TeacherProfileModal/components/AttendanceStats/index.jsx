import React, { useState, useEffect } from "react";
import styles from "./AttendanceStats.module.css";
import { fetchAttendanceData } from "./data.js";

const STATUS_ORDER = [
	{ key: "asistencia", label: "Asistencia", code: 4, color: "#525D73" },
	{ key: "justificado", label: "Justificado", code: 1, color: "#E1885E" },
	{ key: "permiso", label: "Permiso", code: 2, color: "#92CCFF" },
	{ key: "retardo", label: "Retardo", code: 5, color: "#e5d031ff" },
	{ key: "falta", label: "Falta", code: 3, color: "#ef4444" },
];

export default function AttendanceStats({ teacherId }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				const res = await fetchAttendanceData(teacherId);
				if (!mounted) return;
				setData(Array.isArray(res) ? res : []);
			} catch (err) {
				console.error("AttendanceStats: failed to load data", err);
				if (mounted) setData([]);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		load();
		return () => {
			mounted = false;
		};
	}, [teacherId]);

	const total = data.length;

	// contar por estado
	const counts = STATUS_ORDER.reduce((acc, s) => {
		acc[s.key] = total > 0 ? data.filter((d) => d.status === s.code).length : 0;
		return acc;
	}, {});

	// porcentajes (evitar dividir entre 0)
	const percentages = Object.fromEntries(
		Object.entries(counts).map(([k, v]) => [k, total > 0 ? Math.round((v / total) * 100) : 0])
	);

	// porcentaje central = total menos faltas
	const presentCount = Object.entries(counts).reduce((acc, [k, v]) => (k === "falta" ? acc : acc + v), 0);
	const centerPercent = total > 0 ? Math.round((presentCount / total) * 100) : 0;

	const R = 40;
	const C = 2 * Math.PI * R;

	let accumulated = 0;
	const segments = STATUS_ORDER.map((s) => {
		const fraction = total > 0 ? Number(counts[s.key]) / Number(total) : 0;
		const length = Number(fraction) * Number(C);
		const seg = {
			...s,
			count: counts[s.key],
			percent: percentages[s.key],
			length: Number.isFinite(length) ? length : 0,
			offset: Number.isFinite(accumulated) ? accumulated : 0,
		};
		accumulated += length;
		return seg;
	});

	const [tooltip, setTooltip] = useState(null);

	return (
		<div className={styles.wrapper}>
			{/* Gráfica SVG */}
			<div className={styles.chartArea}>
				<svg viewBox="0 0 100 100" className={styles.svg} onMouseLeave={() => setTooltip(null)}>
					<g transform="translate(50,50) rotate(-90)">
						<circle r={R} fill="none" stroke="#23252b" strokeWidth="12" className={styles.baseCircle} />
							{segments.map((seg) => {
								const len = Number.isFinite(Number(seg.length)) ? Number(seg.length) : 0;
								const gap = Number.isFinite(Number(C - len)) ? Number(C - len) : 0;
								const offset = Number.isFinite(Number(seg.offset)) ? Number(seg.offset) : 0;
								return (
									<circle
										key={seg.key}
										r={R}
										fill="none"
										stroke={seg.color}
										strokeWidth="12"
										strokeDasharray={`${len} ${gap}`}
										strokeDashoffset={String(-offset)}
										style={{ transition: "transform 0.12s ease, filter 0.12s ease" }}
										className={styles.segment}
										onMouseEnter={(e) =>
											setTooltip({ x: e.clientX, y: e.clientY, label: seg.label, percent: seg.percent, color: seg.color })
										}
										onMouseMove={(e) => setTooltip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : null))}
										onMouseLeave={() => setTooltip(null)}
									/>
								);
							})}
						<circle r={R - 12 - 6} fill="#ffffffff" />
					</g>
				</svg>

				{/* Texto central */}
				<div className={styles.centerText}>
					<div className={styles.centerPct}>{centerPercent}%</div>
					<div className={styles.centerLabel}>Presente</div>
				</div>

				{/* Tooltip que sigue cursor */}
				{tooltip && (
					<div className={styles.tooltip} style={{ left: tooltip.x + 12, top: tooltip.y - 12, background: tooltip.color }}>
						<strong style={{ marginRight: 8 }}>{tooltip.label}</strong>
						<span>{tooltip.percent}%</span>
					</div>
				)}
			</div>

			{/* Opcional: mostrar estado de carga */}
			{loading && <div className={styles.loading}>Cargando...</div>}
		</div>
	);
}
