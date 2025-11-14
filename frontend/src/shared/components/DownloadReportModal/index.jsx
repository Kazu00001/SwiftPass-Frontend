import React, { useEffect, useState } from "react";
import Styles from "./DownloadReportModal.module.css";
import InputForm from "../InputForm";
import { fetchReportByDateRange } from "./hook.js";

const DownloadReportModal = ({ isOpen, onClose, selectedButton }) => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (selectedButton !== "Reportes" && isOpen) {
			onClose();
		}
	}, [selectedButton, isOpen, onClose]);

	return (
		<section
			className={`${Styles["modal"]} ${!isOpen ? Styles["modal_close"] : ""}`}
		>
			<div
				className={`${Styles["modal_container"]} ${
					!isOpen ? Styles["modal_container_close"] : ""
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={Styles["modal_content"]}>
					<div className={Styles["modal_header"]}>
						<h2>Descargar reporte</h2>
						<button className={Styles["close_button"]} onClick={onClose}>
							&times;
						</button>
					</div>

					<div className={Styles["modal_results"]}>
						<div className={Styles["title-report_container"]}>
							Selecciona un periodo
						</div>
						<div className={Styles["inputs_container"]}>
							<InputForm
								title="Fecha inicio"
								type="date"
								Width="95%"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								name="startDate"
							/>
							<InputForm
								title="Fecha final"
								type="date"
								Width="95%"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								name="endDate"
							/>
						</div>
						{error && <div className={Styles["error_text"]}>{error}</div>}
						<button
							className={Styles["download_button"]}
							onClick={async () => {
								setError(null);
								if (!startDate || !endDate) {
									setError('Por favor selecciona ambas fechas');
									return;
								}
								setLoading(true);
								const res = await fetchReportByDateRange(startDate, endDate);
								setLoading(false);
								if (!res.ok) {
									setError(res.error || 'Error al generar el reporte');
								} else {
									// cerrar modal tras descarga exitosa
									onClose && onClose();
								}
							}}
							disabled={loading}
						>
							{loading ? 'Generando...' : 'Descargar'}
						</button>
					</div>
				</div>
			</div>

			<div
				className={`${Styles["modal_overlay"]} ${
					!isOpen ? Styles["modal_overlay_close"] : ""
				}`}
				onClick={onClose}
			></div>
		</section>
	);
};

export default DownloadReportModal;
