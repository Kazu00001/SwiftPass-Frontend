import Styles from "./ReviewRequestModal.module.css";
import { useState } from "react";

const justificante = "./Graphics/receta.jpeg";
const doc = "./Graphics/docImage.jpeg";
const comentario =
	"Lorem ipsum dolor sit amet consectetur adipiscing elit, pellentesque justo mi orci eleifend nostra malesuada, egestas pretium iaculis lacus nam nisl. Ligula magnis per ultrices felis bibendum ultricies tempor sociis inceptos facilisi quis, vulputate quam id lobortis dictum augue odio massa ridiculus metus nostra, feugiat commodo accumsan sodales nibh etiam suspendisse arcu proin sed. Erat himenaeos placerat cum morbi duis urna ultricies faucibus, tincidunt lacus nec fames dis sed cras orci ornare, tempus habitant ultrices scelerisque aptent netus ante leifend nisi scelerisque primis porttitor feugiat phasellus nisl erat aptent convallis iaculis, felis dictumst ut sapien lectus sociis mollis metus";
const isPending = true;
export default function ReviewRequestModal({ teacher, isOpen, onClose }) {
	const [showImage, setShowImage] = useState(false);

	if (!isOpen) return null;

	return (
		<div className={Styles["modal_overlay"]}>
			<div className={Styles["modal_container"]}>
				<TeacherProfileHeader teacher={teacher} onClose={onClose} />

				<div className={Styles["teacher_profile_container"]}>
					<div className={Styles["top_container"]}>
						<h3 className={Styles["title_text"]}>
							Información del Justificante
						</h3>
						<p className={Styles["small_text"]}>Tipo: Justificante</p>
						<p className={Styles["small_text"]}>Razón: Enfermedad</p>
						<p className={Styles["small_text"]}>dias: 22/10/25 - 12/11/25</p>
					</div>

					<div className={Styles["center_container"]}>
						<button
							className={Styles["document_container"]}
							onClick={() => {
								!justificante || setShowImage(true);
							}}
						>
							<img
								src={doc}
								alt=""
								className={Styles["document_image"]}
								draggable="false"
							/>
						</button>

						<div className={Styles["comment_container"]}>
							<h3 className={Styles["comment_title"]}>Comentarios:</h3>
							<p className={Styles["comment"]}>{comentario}</p>
						</div>
					</div>

					<div className={Styles["bottom_container"]}>
						{isPending && (
							<>
								<button className={Styles["button_1"]}>Rechazar</button>
								<button className={Styles["button_2"]}>Justificar</button>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Modal para ver la imagen */}
			{showImage && (
				<ImageModal
					imageSrc={justificante}
					onClose={() => setShowImage(false)}
				/>
			)}
		</div>
	);
}

/* -------------------------------------------------------
   ° Subcomponente: TeacherProfileHeader
   - Muestra la foto, nombre y correo del profesor.
   - Incluye el botón de cierre del modal.
-------------------------------------------------------- */
function TeacherProfileHeader({ teacher, onClose }) {
	return (
		<div className={Styles["modal_header"]}>
			<div className={Styles["teacher_info_container"]}>
				<div className={Styles["teacher_photo_container"]}>
					<img
						src={teacher.photo}
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
				onClick={onClose}
				aria-label="Cerrar modal"
			>
				✕
			</button>
		</div>
	);
}

/* -------------------------------------------------------
   ° Subcomponente: ImageModal
   - Muestra la imagen del justificante en un modal flotante.
   - Cierra al hacer clic fuera o en el botón ✕.
-------------------------------------------------------- */
function ImageModal({ imageSrc, onClose }) {
	return (
		<div className={Styles["image_modal_overlay"]} onClick={onClose}>
			<div
				className={Styles["image_modal_content"]}
				onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
			>
				<button
					className={Styles["image_modal_close"]}
					onClick={onClose}
					aria-label="Cerrar imagen"
				>
					✕
				</button>
				<img
					src={imageSrc}
					alt="Justificante"
					className={Styles["image_modal_img"]}
					draggable="false"
				/>
			</div>
		</div>
	);
}
