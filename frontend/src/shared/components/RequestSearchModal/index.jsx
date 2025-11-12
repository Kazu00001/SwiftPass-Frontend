import React, { useState, useEffect } from "react";
import Styles from "./TeacherSearchModal.module.css";
import DefaultSearchImage from "./components/DefaultSearchImage";
import TeacherResultBox from "./components/TeacherResultBox";
import ReviewRequestModal from "../ReviewRequestModal";
import TEACHERS from "./Teachers";

const RequestSearchModal = ({ isOpen, onClose, selectedButton }) => {
	const [activeTab, setActiveTab] = useState(["Todos", 0]);
	const [isReversed, setIsReversed] = useState(false);
	const [selectedTeacher, setSelectedTeacher] = useState(null);

	useEffect(() => {
		if (selectedButton !== "Pendientes" && isOpen) {
			onClose();
		}
	}, [selectedButton, isOpen, onClose]);

	const handleOpenModal = (teacher) => {
		setSelectedTeacher(teacher);
	};

	const handleCloseModal = () => {
		setSelectedTeacher(null);
	};

	const filteredTeachers = () => {
		let filtered = TEACHERS;
		if (activeTab[0] === "Justificaciones") {
			filtered = TEACHERS.filter((teacher) => teacher.status === 1);
		} else if (activeTab[0] === "Permisos") {
			filtered = TEACHERS.filter((teacher) => teacher.status === 2);
		}
		return isReversed ? filtered.slice().reverse() : filtered;
	};

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
						<h2>Pendientes</h2>
						<button
							className={`${Styles["pending_requests_button"]} ${
								activeTab[0] === "Todos"
									? Styles["pending_requests_button_active"]
									: ""
							}`}
							onClick={() => setActiveTab(["Todos", 0])}
						>
							Todos
						</button>
						<button
							className={`${Styles["pending_requests_button"]} ${
								activeTab[0] === "Justificaciones"
									? Styles["pending_requests_button_active"]
									: ""
							}`}
							onClick={() => setActiveTab(["Justificaciones", 1])}
						>
							Justificaciones
						</button>
						<button
							className={`${Styles["pending_requests_button"]} ${
								activeTab[0] === "Permisos"
									? Styles["pending_requests_button_active"]
									: ""
							}`}
							onClick={() => setActiveTab(["Permisos", 2])}
						>
							Permisos
						</button>
						<button
							className={Styles["pending_requests_button"]}
							onClick={() => setIsReversed(!isReversed)}
						>
							{isReversed ? "Mostrar Original" : "Invertir Lista"}
						</button>
						<button className={Styles["close_button"]} onClick={onClose}>
							&times;
						</button>
					</div>

					<div className={Styles["search-bar_container"]}>
						<input
							type="text"
							placeholder="Search..."
							className={Styles["search-input"]}
						/>
					</div>

					<div className={Styles["modal_results"]}>
						{filteredTeachers().length > 0 ? (
							filteredTeachers().map((teacher) => (
								<TeacherResultBox
									key={teacher.id}
									teacher={teacher}
									Click={() => handleOpenModal(teacher)}
								/>
							))
						) : (
							<DefaultSearchImage />
						)}
					</div>
				</div>
			</div>

			<div
				className={`${Styles["modal_overlay"]} ${
					!isOpen ? Styles["modal_overlay_close"] : ""
				}`}
				onClick={onClose}
			></div>
			{selectedTeacher && (
				<ReviewRequestModal
					isOpen={!!selectedTeacher}
					onClose={handleCloseModal}
					teacher={selectedTeacher}
				/>
			)}
		</section>
	);
};

export default RequestSearchModal;
