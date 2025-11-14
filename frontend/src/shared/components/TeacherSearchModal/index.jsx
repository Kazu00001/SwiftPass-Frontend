import React, { useEffect, useState, useMemo } from "react";
import Styles from "./TeacherSearchModal.module.css";
import DefaultSearchImage from "./components/DefaultSearchImage";
import TeacherResultBox from "./components/TeacherResultBox";
import TeacherProfileModal from "../TeacherProfileModal";
import { fetchTeachers2 } from "./Teachers";
const searchIcon = "/Graphics/icons/lupa.png";

const TeacherSearchModal = ({ isOpen, onClose, selectedButton }) => {
	const [TEACHERS, setTEACHERS] = React.useState([]);
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [loading, setLoading] = useState(false);

	// 🔹 Nuevo estado
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				const list = await fetchTeachers2();
				if (!mounted) return;
				setTEACHERS(Array.isArray(list) ? list : []);
			} catch (err) {
				console.error("TeacherSearchModal: failed to load teachers", err);
				if (mounted) setTEACHERS([]);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		load();
		return () => (mounted = false);
	}, []);

	useEffect(() => {
		const t = setTimeout(
			() => setDebouncedQuery(query.trim().toLowerCase()),
			200
		);
		return () => clearTimeout(t);
	}, [query]);

	const filteredList = useMemo(() => {
		const q = debouncedQuery;
		if (!q) return TEACHERS;
		return (TEACHERS || []).filter((t) => {
			const name = String(t?.name ?? "").toLowerCase();
			const id = String(t?.id ?? "").toLowerCase();
			const email = String(t?.email ?? "").toLowerCase();
			return name.includes(q) || id.includes(q) || email.includes(q);
		});
	}, [TEACHERS, debouncedQuery]);

	useEffect(() => {
		if (selectedButton !== "Buscar" && isOpen) {
			onClose();
		}
	}, [selectedButton, isOpen, onClose]);

	// 🔹 Al hacer clic en un profesor
	const handleTeacherClick = (teacher) => {
		setSelectedTeacher(teacher);
		setIsProfileModalOpen(true);
	};

	// 🔹 Cerrar modal
	const handleCloseProfileModal = () => {
		setSelectedTeacher(null);
		setIsProfileModalOpen(false);
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
						<h2>Buscar Profesor</h2>
						<button className={Styles["close_button"]} onClick={onClose}>
							&times;
						</button>
					</div>

					<div className={Styles["search-bar_container"]}>
						<img
							src={searchIcon}
							className={Styles["search-icon"]}
							alt="buscar"
						/>
						<input
							type="text"
							placeholder="Buscar profesor..."
							className={Styles["search-input"]}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					<div className={Styles["modal_results"]}>
						{loading ? (
							<div className={Styles.loading}>Cargando...</div>
						) : filteredList && filteredList.length > 0 ? (
							filteredList.map((teacher, index) => (
								<TeacherResultBox
									key={`${teacher.id}-${index}`}
									teacher={teacher}
									onClick={() => handleTeacherClick(teacher)} // 🔹 CLICK
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
			/>

			{/* 🔹 Modal del profesor */}
			{selectedTeacher && (
				<TeacherProfileModal
					teacher={selectedTeacher}
					isOpen={isProfileModalOpen}
					onClose={handleCloseProfileModal}
				/>
			)}
		</section>
	);
};

export default TeacherSearchModal;
