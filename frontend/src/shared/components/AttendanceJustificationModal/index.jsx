import { useState } from "react";
import Styles from "./AttendanceJustificationModal.module.css";
import AttendanceTeacherCalendar from "./components/AttendanceTeacherCalendar";
import InputForm from "../InputForm";

const teacher = {
	id: 1,
	name: "Rodrigo Melanzadez",
	photo: "https://randomuser.me/api/portraits/men/2.jpg",
	time: "00:00",
	status: 3,
	email: "Rodrigo_Melanzadez@academicos.udg.mx",
};

export default function AttendanceJustificationModal({
	isOpen,
	onClose,
	setSelectedButton,
}) {
	const [selectedDays, setSelectedDays] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	const handleSelectionChange = (days) => {
		setSelectedDays(days);
		console.log("📅 Días seleccionados:", days);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file || null);
		console.log("Archivo seleccionado:", file ? file.name : "Ninguno");
	};

	if (!isOpen) return null;

	return (
		<div className={Styles["modal_overlay"]}>
			<div className={Styles["modal_container"]}>
				<TeacherProfileHeader
					teacher={teacher}
					onClose={onClose}
					setSelectedButton={setSelectedButton}
				/>

				<div className={Styles["teacher_profile_container"]}>
					<div className={Styles["attendance_calendar_main_container"]}>
						<AttendanceTeacherCalendar
							selectedDays={selectedDays}
							onSelectionChange={handleSelectionChange}
						/>
					</div>

					{/* FORMULARIO */}
					<div className={Styles["inputs_container"]}>
						<InputForm
							title="Selecciona una opción"
							type="select"
							Width="100%"
							Height="40px"
							name="Holiii"
							options={["", "Opción A", "Opción B", "Opción C"]}
							value={"hola"}
						/>

						<div
							className={`${Styles["input_file_container"]} ${
								selectedFile ? Styles["input_file_active"] : ""
							}`}
						>
							<input
								type="file"
								className={Styles["input_file"]}
								onChange={handleFileChange}
							/>
							{selectedFile ? (
								<p className={Styles["file_name"]}>{selectedFile.name}</p>
							) : (
								<p className={Styles["input_name"]}>Ingresa un Archivo</p>
							)}
						</div>

						<InputForm
							title="Comentarios"
							type="area"
							Width="100%"
							Height="10rem"
							name="Holiii"
						/>
						<button className={Styles["send_button"]}>Enviar</button>
					</div>
				</div>
			</div>
		</div>
	);
}

/* -------------------------------------------------------
   ° Subcomponente: TeacherProfileHeader
-------------------------------------------------------- */
function TeacherProfileHeader({ teacher, onClose, setSelectedButton }) {
	return (
		<div className={Styles["modal_header"]}>
			<div className={Styles["teacher_info_container"]}>
				<div className={Styles["teacher_photo_container"]}>
					<img
						src={teacher.photo || null}
						alt={`${teacher.name}'s photo`}
						className={Styles["teacher_photo"]}
						draggable="false"
					/>
				</div>
				<div className={Styles["teacher_details_container"]}>
					<h2 className={Styles["teacher_name"]}>{teacher.name}</h2>
					<p className={Styles["teacher_email"]}>Email: {teacher.email}</p>
				</div>
			</div>
			<button
				className={Styles["modal_close_button"]}
				onClick={() => {
					onClose();
					setSelectedButton(null);
				}}
				aria-label="Cerrar modal"
			>
				✕
			</button>
		</div>
	);
}
