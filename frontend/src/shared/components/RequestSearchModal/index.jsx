import React, { useState, useEffect } from "react";
import Styles from "./TeacherSearchModal.module.css";
import DefaultSearchImage from "./components/DefaultSearchImage";
import TeacherResultBox from "./components/TeacherResultBox";
import ReviewRequestModal from "../ReviewRequestModal";
import { fetchHistoryTeachersList } from "./Teachers";
const searchIcon = "/Graphics/icons/lupa.png";

const RequestSearchModal = ({ isOpen, onClose, selectedButton }) => {
	const [activeSection, setActiveSection] = useState("Pendientes");
	const [activeTab, setActiveTab] = useState(["Todos", 0]);
	const [isReversed, setIsReversed] = useState(false);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [query, setQuery] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (selectedButton !== "Solicitudes" && isOpen) {
			onClose();
		}
	}, [selectedButton, isOpen, onClose]);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				const list = await fetchHistoryTeachersList();
				if (!mounted) return;
				setTeachers(Array.isArray(list) ? list : []);
			} catch (err) {
				console.error('RequestSearchModal: failed to load teachers', err);
				if (mounted) setTeachers([]);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		load();
		return () => (mounted = false);
	}, []);

	const handleOpenModal = (teacher) => setSelectedTeacher(teacher);
	const handleCloseModal = () => setSelectedTeacher(null);

	const filteredTeachers = (section) => {
		const q = (query || "").trim().toLowerCase();
		let filtered = (teachers || []).filter((t) =>
			section === "Pendientes" ? t.isPending : !t.isPending
		);

		if (activeTab[0] === "Justificaciones") {
			filtered = filtered.filter((t) => t.status === 1);
		} else if (activeTab[0] === "Permisos") {
			filtered = filtered.filter((t) => t.status === 2);
		}

		if (q) {
			filtered = filtered.filter((t) => {
				const name = String(t.name ?? "").toLowerCase();
				const id = String(t.id ?? "").toLowerCase();
				const email = String(t.email ?? "").toLowerCase();
				return name.includes(q) || id.includes(q) || email.includes(q);
			});
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
						<button
							className={`${Styles["tab_button"]} ${
								activeSection === "Pendientes" ? Styles["active_section"] : ""
							}`}
							onClick={() => setActiveSection("Pendientes")}
						>
							Pendientes
						</button>
						<button
							className={`${Styles["tab_button"]} ${
								activeSection === "Historial" ? Styles["active_section"] : ""
							}`}
							onClick={() => setActiveSection("Historial")}
						>
							Historial
						</button>

						<button className={Styles["close_button"]} onClick={onClose}>
							&times;
						</button>
					</div>

					{activeSection === "Pendientes" ? (
						<PendingRequestsContent
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							isReversed={isReversed}
							setIsReversed={setIsReversed}
							filteredTeachers={() => filteredTeachers("Pendientes")}
							handleOpenModal={handleOpenModal}
							query={query}
							setQuery={setQuery}
							loading={loading}
						/>
					) : (
						<HistoryContent
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							isReversed={isReversed}
							setIsReversed={setIsReversed}
							filteredTeachers={() => filteredTeachers("Historial")}
							handleOpenModal={handleOpenModal}
							query={query}
							setQuery={setQuery}
							loading={loading}
						/>
					)}
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

/* -------------------------------------------------------
   ° Subcomponente: PendingRequestsContent
-------------------------------------------------------- */
function PendingRequestsContent({
	activeTab,
	setActiveTab,
	isReversed,
	setIsReversed,
	filteredTeachers,
	handleOpenModal,
	query,
	setQuery,
	loading,
}) {
	return (
		<>
			<div className={Styles["search-bar_container"]}>
				<img src={searchIcon} className={Styles["search-icon"]} alt="buscar" />
				<input
					type="text"
					placeholder="Buscar profesor..."
					className={Styles["search-input"]}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

			<div className={Styles["filters_container"]}>
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
			</div>

			<div className={Styles["modal_results"]}>
					{loading ? (
					<div className={Styles.loading}>Cargando...</div>
				) : (() => {
					const list = filteredTeachers() || [];
					return list.length > 0 ? (
						list.map((teacher, index) => (
							<TeacherResultBox
								key={`${teacher.id}-${index}`}
								teacher={teacher}
								Click={() => handleOpenModal(teacher)}
							/>
						))
					) : (
						<DefaultSearchImage />
					);
				})()}
			</div>
		</>
	);
}

/* -------------------------------------------------------
   ° Subcomponente: HistoryContent
-------------------------------------------------------- */
function HistoryContent({
	activeTab,
	setActiveTab,
	isReversed,
	setIsReversed,
	filteredTeachers,
	handleOpenModal,
	query,
	setQuery,
	loading,
}) {
	return (
		<>
			<div className={Styles["search-bar_container"]}>
				<img src={searchIcon} className={Styles["search-icon"]} alt="buscar" />
				<input
					type="text"
					placeholder="Buscar profesor..."
					className={Styles["search-input"]}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

			<div className={Styles["filters_container"]}>
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
			</div>

			<div className={Styles["modal_results"]}>
					{loading ? (
					<div className={Styles.loading}>Cargando...</div>
				) : (() => {
					const list = filteredTeachers() || [];
					return list.length > 0 ? (
						list.map((teacher, index) => (
							<TeacherResultBox
								key={`${teacher.id}-${index}`}
								teacher={teacher}
								Click={() => handleOpenModal(teacher)}
							/>
						))
					) : (
						<DefaultSearchImage />
					);
				})()}
			</div>
		</>
	);
}
