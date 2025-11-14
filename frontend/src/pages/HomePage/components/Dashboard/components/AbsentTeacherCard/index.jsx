import Styles from "./AbsentTeacherCard.module.css";
import { useState, useEffect } from "react";
import { TEACHERS } from "../PendingRequestsCard/Teachers.js";
import TeacherEventCard from "../TeacherEventCard";
import EmptyBox from "../EmptyBox/index.jsx";
import PendingRequestsSkeleton from "../PendingRequestsSkeleton/index.jsx";
import TeacherProfileModal from "../../../../../../shared/components/TeacherProfileModal";

export default function AbsentTeacherCard() {
	const [activeTab, setActiveTab] = useState("Todos");
	const [isLoading, setIsLoading] = useState(true);

	// 🔥 MISMA LÓGICA QUE PendingRequestsCard
	const [selectedTeacher, setSelectedTeacher] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	const handleOpenModal = (teacher) => {
		setSelectedTeacher(teacher);
	};

	const handleCloseModal = () => {
		setSelectedTeacher(null);
	};

	return (
		<div className={Styles["absent_teacher_card"]}>
			<section className={Styles["absent_teacher_header"]}>
				<h2 className={Styles["absent_teacher_title"]}>Profesores Ausentes</h2>
			</section>

			{isLoading ? (
				<PendingRequestsSkeleton />
			) : (
				<section className={Styles["absent_teacher_body"]}>
					{TEACHERS.length === 0 ? (
						<EmptyBox />
					) : (
						TEACHERS.map((teacher) => (
							<div key={teacher.id} onClick={() => handleOpenModal(teacher)}>
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

			{selectedTeacher && (
				<TeacherProfileModal
					isOpen={!!selectedTeacher}
					onClose={handleCloseModal}
					teacher={selectedTeacher}
				/>
			)}
		</div>
	);
}
