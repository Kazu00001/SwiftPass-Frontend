import React, { useEffect } from "react";
import Styles from "./DownloadReportModal.module.css";
import InputForm from "../InputForm";

const DownloadReportModal = ({ isOpen, onClose, selectedButton }) => {
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
						<h2>Buscar Profesor</h2>
						<button className={Styles["close_button"]} onClick={onClose}>
							&times;
						</button>
					</div>

					<div className={Styles["modal_results"]}>
						<div className={Styles["title-report_container"]}>
							Seleccióna un periodo
						</div>
						<div className={Styles["inputs_container"]}>
							<InputForm
								title="Fecha inicio&ensp;&ensp;"
								type="date"
								Width="95%"
							/>
							<InputForm
								title="Fecha final&ensp;&ensp;&ensp;"
								type="date"
								Width="95%"
							/>
						</div>
						<button className={Styles["download_button"]}>Descargar</button>
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
