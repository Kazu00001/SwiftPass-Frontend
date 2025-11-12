// AttendanceStats.jsx
import React, { useState } from "react";
import styles from "./AttendanceStats.module.css";
import data from "./data.js";

const STATUS_ORDER = [
	{ key: "asistencia", label: "Asistencia", code: 3, color: "#525D73" },
	{ key: "justificado", label: "Justificado", code: 1, color: "#E1885E" },
	{ key: "permiso", label: "Permiso", code: 2, color: "#92CCFF" },
	{ key: "retardo", label: "Retardo", code: 5, color: "#e5d031ff" },
	{ key: "falta", label: "Falta", code: 4, color: "#ef4444" },
];

export default function AttendanceStats() {
	const total = data.length;

	// calcular counts
	const counts = STATUS_ORDER.reduce((acc, s) => {
		acc[s.key] = data.filter((d) => d.status === s.code).length;
		return acc;
	}, {});

	// porcentajes (redondeados)
	const percentages = Object.fromEntries(
		Object.entries(counts).map(([k, v]) => [k, Math.round((v / total) * 100)])
	);

	// porcentaje central = TODO menos faltas
	const presentCount = Object.entries(counts).reduce(
		(acc, [k, v]) => (k === "falta" ? acc : acc + v),
		0
	);
	const centerPercent = Math.round((presentCount / total) * 100);

	const R = 40;
	const C = 2 * Math.PI * R;

	let accumulated = 0;
	const segments = STATUS_ORDER.map((s) => {
		const fraction = counts[s.key] / total;
		const length = fraction * C;
		const seg = {
			...s,
			count: counts[s.key],
			percent: percentages[s.key],
			length,
			offset: accumulated,
		};
		accumulated += length;
		return seg;
	});

	// tooltip state
	const [tooltip, setTooltip] = useState(null);

	return (
		<div className={styles.wrapper}>
			{/* Leyenda */}
			<div className={styles.legend}>
				{STATUS_ORDER.map((s) => (
					<div key={s.key} className={styles.legendItem}>
						<span
							className={styles.legendDot}
							style={{ background: s.color }}
						/>
						<div className={styles.legendText}>
							<div className={styles.legendLabel}>{s.label}</div>
						</div>
					</div>
				))}
			</div>

			{/* Gráfica SVG */}
			<div className={styles.chartArea}>
				<svg
					viewBox="0 0 100 100"
					className={styles.svg}
					onMouseLeave={() => setTooltip(null)}
				>
					{/* Rotamos -90deg para empezar desde arriba */}
					<g transform="translate(50,50) rotate(-90)">
						{/* Base gris (fondo del anillo) */}
						<circle
							r={R}
							fill="none"
							stroke="#23252b"
							strokeWidth="12"
							className={styles.baseCircle}
						/>

						{/* Segmentos (stroke-dasharray + stroke-dashoffset) */}
						{segments.map((seg) => (
							<circle
								key={seg.key}
								r={R}
								fill="none"
								stroke={seg.color}
								strokeWidth="12"
								strokeDasharray={`${seg.length} ${C - seg.length}`}
								strokeDashoffset={-seg.offset}
								style={{
									transition: "transform 0.12s ease, filter 0.12s ease",
								}}
								className={styles.segment}
								onMouseEnter={(e) =>
									setTooltip({
										x: e.clientX,
										y: e.clientY,
										label: seg.label,
										percent: seg.percent,
										color: seg.color,
									})
								}
								onMouseMove={(e) =>
									setTooltip((t) =>
										t ? { ...t, x: e.clientX, y: e.clientY } : null
									)
								}
								onMouseLeave={() => setTooltip(null)}
							/>
						))}

						{/* agujero central (se hace con un circle blanco encima) */}
						<circle r={R - 12 - 6} fill="#ffffffff" />
						{/* El color y fondo puedes ajustar a tu UI */}
					</g>
				</svg>

				{/* Texto central */}
				<div className={styles.centerText}>
					<div className={styles.centerPct}>{centerPercent}%</div>
					<div className={styles.centerLabel}>Presente</div>
				</div>

				{/* Tooltip que sigue cursor */}
				{tooltip && (
					<div
						className={styles.tooltip}
						style={{
							left: tooltip.x + 12,
							top: tooltip.y - 12,
							background: tooltip.color,
						}}
					>
						<strong style={{ marginRight: 8 }}>{tooltip.label}</strong>
						<span>{tooltip.percent}%</span>
					</div>
				)}
			</div>
		</div>
	);
}
