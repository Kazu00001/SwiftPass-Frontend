import { useState } from "react";
import { API_URL, getTeacherId } from "../../../utils/env.js";
import { getAuthHeader } from "../../../utils/Auth.js";
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

	// Controlled inputs
	const [reason, setReason] = useState(""); // título / motivo corto
	const [comments, setComments] = useState(""); // motivo más largo / comentarios
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSelectionChange = (days) => {
		setSelectedDays(days);
		console.log("📅 Días seleccionados:", days);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedFile(file || null);
		console.log("Archivo seleccionado:", file ? file.name : "Ninguno");
	};

	async function handleSubmit() {
		setError(null);
		if (!selectedDays || selectedDays.length === 0) {
			setError('Seleccione al menos un día en el calendario');
			return;
		}

		// Determinar id del profesor: usar getTeacherId() si está disponible
		const resolvedTeacherId = getTeacherId() || teacher.id;

		// Si sólo hay un día: justificante (un día)
		const isJustificante = selectedDays.length === 1;

		const fd = new FormData();
		fd.append('id_maestro', String(resolvedTeacherId));

		if (isJustificante) {
			// usar título corto y comentarios como motivo
			fd.append('titulo', reason || 'Justificante');
			fd.append('motivo', comments || reason || '');
			// fecha en formato YYYY-MM-DD (la calendar component ya debe proveer ese formato)
			const fecha = selectedDays[0];
			fd.append('fecha', fecha);
		} else {
			// permisos: fecha_inicio y fecha_fin
			// calcular min/max por seguridad
			const sorted = [...selectedDays].sort();
			const fecha_inicio = sorted[0];
			const fecha_fin = sorted[sorted.length - 1];
			fd.append('motivo', comments || reason || 'Permiso');
			fd.append('fecha_inicio', fecha_inicio);
			fd.append('fecha_fin', fecha_fin);
		}

		if (selectedFile) {
			fd.append('file', selectedFile, selectedFile.name);
		}

		const url = `${API_URL}/api/teachers/${resolvedTeacherId}/records`;

		// Validación de archivo (si existe)
		if (selectedFile) {
			const maxBytes = 5 * 1024 * 1024; // 5 MB
			if (selectedFile.size > maxBytes) {
				setError('El archivo es muy grande. Máximo 5 MB.');
				setLoading(false);
				return;
			}
			const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
			if (!allowed.includes(selectedFile.type)) {
				setError('Tipo de archivo no permitido. Sólo JPG/JPEG/PNG.');
				setLoading(false);
				return;
			}
		}

		// indicar el tipo al backend
		fd.append('type', isJustificante ? 'justificante' : 'permiso');

		setLoading(true);
		try {
			const headers = { ...getAuthHeader(), Accept: 'application/json' };
			// NOTA: no incluir Content-Type para FormData (el navegador lo gestiona)
			const resp = await fetch(url, { method: 'POST', headers, body: fd });

			if (!resp.ok) {
				let msg = `Error ${resp.status}`;
				try {
					const j = await resp.json().catch(() => null);
					msg = j?.message || JSON.stringify(j) || msg;
				} catch (e) {
					// ignore
				}
				setError(msg);
				console.error('Upload failed', msg);
				return;
			}

			const data = await resp.json().catch(() => null);
			console.log('Upload success', data);
			// Cerrar modal y limpiar
			onClose();
			setSelectedButton(null);
		} catch (err) {
			console.error('submit error', err);
			setError(err.message || String(err));
		} finally {
			setLoading(false);
		}
	}

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
							name="reason"
							options={["", "Asistencia médica", "Asunto familiar", "Emergencia/Imprevisto", "Compromiso laboral/académico", "Falla de transporte", "Cita programada"]}
							value={reason}
							onChange={(e) => setReason(e.target.value)}
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
							name="comments"
							value={comments}
							onChange={(e) => setComments(e.target.value)}
						/>
						<button
							className={Styles["send_button"]}
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? 'Enviando...' : 'Enviar'}
						</button>
						{error && <p style={{ color: 'var(--danger, #b00020)', marginTop: '8px' }}>{error}</p>}
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
					<p className={Styles["teacher_email"]}>{teacher.email}</p>
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
