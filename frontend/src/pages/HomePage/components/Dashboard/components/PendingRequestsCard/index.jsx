import Styles from "./PendingRequestsCard.module.css";
import { useState, useEffect } from "react";
import { TEACHERS } from "../PendingRequestsCard/Teachers.js";
import TeacherEventCard from "../TeacherEventCard";
import EmptyBox from "../EmptyBox/index.jsx";
import PendingRequestsSkeleton from "../PendingRequestsSkeleton/index.jsx";
import ReviewRequestModal from "../../../../../../shared/components/ReviewRequestModal";

export default function PendingRequestsCard() {
	const [activeTab, setActiveTab] = useState(["Todos", 0]);
	const [isReversed, setIsReversed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [selectedTeacher, setSelectedTeacher] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	const filteredTeachers = () => {
		let filtered = TEACHERS;
		if (activeTab[0] === "Justificaciones") {
			filtered = TEACHERS.filter((teacher) => teacher.status === 1);
		} else if (activeTab[0] === "Permisos") {
			filtered = TEACHERS.filter((teacher) => teacher.status === 2);
		}
		return isReversed ? filtered.slice().reverse() : filtered;
	};

	const handleOpenModal = (teacher) => {
		setSelectedTeacher(teacher);
	};

	const handleCloseModal = () => {
		setSelectedTeacher(null);
	};

	return (
		<div className={Styles["pending_requests_card"]}>
			<section className={Styles["pending_requests_header"]}>
				<h2 className={Styles["pending_requests_title"]}>
					Solicitudes Pendientes
				</h2>

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
			</section>

			{isLoading ? (
				<PendingRequestsSkeleton />
			) : (
				<section className={Styles["pending_requests_body"]}>
					{filteredTeachers().length === 0 ? (
						<EmptyBox />
					) : (
						filteredTeachers().map((teacher, index) => (
							<div key={`${teacher.id}-${index}`} onClick={() => handleOpenModal(teacher)}>
								<TeacherEventCard
									name={teacher.name}
									photo={teacher.photo}
									status={teacher.status}
									time={teacher.time}
								/>
							</div>
						))
					)}
				</section>
			)}

			{/* 🔹 Modal de revisión */}
			{selectedTeacher && (
				<ReviewRequestModal
					isOpen={!!selectedTeacher}
					onClose={handleCloseModal}
					teacher={selectedTeacher}
				/>
			)}
		</div>
	);
}
