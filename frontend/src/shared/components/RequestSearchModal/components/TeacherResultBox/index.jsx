import Styles from "./TeacherResultBox.module.css";

export default function TeacherResultBox({ teacher, Click }) {
	const formatDate = (dateString) => {
		if (!dateString) return "";

		const [year, month, day] = dateString.split("-").map(Number);
		const teacherDate = new Date(year, month - 1, day);

		const today = new Date();
		const todayStart = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		);
		const teacherStart = new Date(
			teacherDate.getFullYear(),
			teacherDate.getMonth(),
			teacherDate.getDate()
		);

		const diffDays = Math.floor(
			(todayStart - teacherStart) / (1000 * 60 * 60 * 24)
		);

		if (diffDays === 0) return "Hoy";
		if (diffDays === 1) return "Ayer";

		// Formato dd/mm/aa
		const dayStr = String(teacherDate.getDate()).padStart(2, "0");
		const monthStr = String(teacherDate.getMonth() + 1).padStart(2, "0");
		const yearStr = String(teacherDate.getFullYear()).slice(-2);

		return `${dayStr}/${monthStr}/${yearStr}`;
	};

	const getStatusLabel = (status) => {
		if (status === 1) return "Justificante";
		if (status === 2) return "Permiso";
		return null;
	};

	// 🔹 Texto del tooltip según isPending
	const tooltipText = teacher.isPending ? "Pendiente" : "Terminado";

	return (
		<div
			className={`${Styles["teacher-result_box"]} ${
				Styles[`teacher_event_${teacher.status}`]
			}`}
			onClick={Click}
		>
			<div className={Styles["teacher-result_photo_container"]}>
				<img
					src={teacher.photo}
					alt={`${teacher.name}'s photo`}
					className={Styles["teacher-result_photo"]}
					draggable="false"
				/>
			</div>

			<div className={Styles["teacher-result_info"]}>
				<p className={Styles["teacher-result_name"]}>{teacher.name}</p>
				<p className={Styles["teacher-result_subject"]}>{teacher.subject}</p>
			</div>

			<div className={Styles["corner"]}>
				<div className={Styles["date_container"]}>
					<div className={Styles[`time_container_${teacher.status}`]}>
						<p>{formatDate(teacher.date)} &ensp;|</p>
						<p>{teacher.time}</p>
					</div>
				</div>
			</div>

			{/* Círculo + Tooltip */}
			<div className={Styles["pending_circle_wrapper"]}>
				<div
					className={`${Styles[`pending_circle_${teacher.status}`]} ${
						Styles[`pending_bg_${teacher.isPending}`]
					}`}
				>
					<span className={Styles["pending_tooltip"]}>
						{teacher.isPending ? "Pendiente" : "Terminado"}
					</span>
				</div>
			</div>
		</div>
	);
}
