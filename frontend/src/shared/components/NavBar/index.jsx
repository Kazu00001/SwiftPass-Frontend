import React, { useState,useEffect } from "react";
import Styles from "./NavBar.module.css";
import TeacherSearchModal from "../TeacherSearchModal";
import RequestSearchModal from "../RequestSearchModal";
import AttendanceJustificationModal from "../AttendanceJustificationModal";
import DownloadReportModal from "../DownloadReportModal";
import { getTypeUser, getTeacherId } from "../../../utils/env";
import {clearAuthToken } from "../../../utils/Auth.js";
import { fetchAttendanceDateRange, fetchTeacherPhoto } from "./hook.js";
import { API_URL } from "../../../utils/env";
const searchIcon = "/Graphics/icons/lupaW.png";
const reportIcon = "/Graphics/icons/reports.png";
const notiIcon = "/Graphics/icons/noti.png";
const requestIcon = "/Graphics/icons/circle.png";

const NavBar = () => {
	// obtener tipo de usuario y teacherId en tiempo de render (síncrono)
	const credencial = getTypeUser() || null;
	const teacherId = getTeacherId() || null;
	console.log("User Type in NavBar:", credencial);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const [isJustModalOpen, setIsJustModalOpen] = useState(false);
	const [selectedButton, setSelectedButton] = useState(null);
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
	const [ima, setIma] = useState(null);
	useEffect(() => {
		let mounted = true;
		let objectUrlToRevoke = null;
		const loadTeacherPhoto = async () => {
			if (!teacherId) return;
			try {
				let photoSrc = await fetchTeacherPhoto(teacherId);
				if (!mounted) return;
				// normalizar rutas relativas que vengan sin host (p.ej. "/images/..")
				if (photoSrc && String(photoSrc).startsWith('/')) {
					photoSrc = `${API_URL}${photoSrc}`;
				}
				// si la URL existe pero falló por extensión (.jpg vs .png), intentamos autoguardar con alternativas
				const ensureValidImageUrl = async (url) => {
					if (!url || typeof url !== 'string') return url;
					try {
						const head = await fetch(url, { method: 'HEAD' });
						if (head.ok) return url;
					} catch (e) {
						// ignore
					}
					// intentar con extensiones comunes si la url termina en .jpg/.jpeg/.png/.webp
					const exts = ['.png', '.jpg', '.jpeg', '.webp'];
					const idx = url.lastIndexOf('.');
					if (idx === -1) return url;
					const base = url.substring(0, idx);
					for (const ext of exts) {
						const tryUrl = base + ext;
						try {
							const r = await fetch(tryUrl, { method: 'HEAD' });
							if (r.ok) return tryUrl;
						} catch (err) {
							// continue
						}
					}
					return url;
				};
				photoSrc = await ensureValidImageUrl(photoSrc);
				// si la respuesta es una object URL (blob:), la guardamos para revocarla en cleanup
				if (photoSrc && String(photoSrc).startsWith('blob:')) objectUrlToRevoke = photoSrc;
				setIma(photoSrc);
			} catch (error) {
				console.error("Failed to fetch teacher photo:", error);
				setIma(null);
			}
		};
	loadTeacherPhoto();
	console.log("Teacher ID in NavBar:", teacherId, "photoSrc:", ima);
		return () => {
			mounted = false;
			if (objectUrlToRevoke) {
				try {
					URL.revokeObjectURL(objectUrlToRevoke);
				} catch (e) {
					/* ignore */
				}
			}
		};
	}, [teacherId]);
	const handleSearchClick = () => {
		setIsModalOpen(true);
	};
	const handleSearchRequestClick = () => {
		setIsRequestModalOpen(true);
	};
	const handleJustModalClick = () => {
		setIsJustModalOpen(true);
	};

	const handleReportModalClick = () => {
		setIsDownloadModalOpen(true);
	};
	return (
		<>
			<header className={Styles["navbar_container"]}>
				<h3 className={Styles["navbar_logo"]}>Swift Pass</h3>
				<nav className={Styles["navbar_links"]}>
					{credencial == "admin" ? (
						<>
							<NavButton
								Click={handleSearchClick}
								name="Buscar"
								icon={searchIcon}
								selectedButton={selectedButton}
								setSelectedButton={setSelectedButton}
							/>
							<NavButton
								Click={handleReportModalClick}
								name="Reportes"
								icon={reportIcon}
								selectedButton={selectedButton}
								setSelectedButton={setSelectedButton}
							/>
							<NavButton
								Click={handleSearchRequestClick}
								name="Solicitudes"
								icon={notiIcon}
								selectedButton={selectedButton}
								setSelectedButton={setSelectedButton}
							/>
						</>
					) : (
						<>
							<NavButton
								Click={handleJustModalClick}
								name="Justificar"
								icon={requestIcon}
								selectedButton={selectedButton}
								setSelectedButton={setSelectedButton}
							/>
							<NavButton
								Click={() => fetchAttendanceDateRange(teacherId)}
								name="Reporte"
								icon={reportIcon}
							/>
						</>
					)}
				</nav>

				<button
					className={Styles["logout_button"]}
					onClick={() => {
						try {
							clearAuthToken();
							// reload to reflect logout state (fallback to home)
							window.location.reload();
						} catch (err) {
							console.error('Logout failed:', err);
						}
					}}
				>
					<div className={Styles["logout_profile_photo-container"]}>
						<img src={ima || '/Graphics/default-profile.png'} alt="Perfil" />
					</div>
					<p className={Styles["logout_profile_label"]}>LogOut</p>
				</button>
			</header>
			<TeacherSearchModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					selectedButton !== "Buscar"
						? setSelectedButton(selectedButton)
						: setSelectedButton(null);
				}}
				selectedButton={selectedButton}
				setSelectedButton={setSelectedButton}
			/>
			<DownloadReportModal
				isOpen={isDownloadModalOpen}
				onClose={() => {
					setIsDownloadModalOpen(false);
					selectedButton !== "Reportes"
						? setSelectedButton(selectedButton)
						: setSelectedButton(null);
				}}
				selectedButton={selectedButton}
				setSelectedButton={setSelectedButton}
			/>
			<RequestSearchModal
				isOpen={isRequestModalOpen}
				onClose={() => {
					setIsRequestModalOpen(false);
					selectedButton !== "Solicitudes"
						? setSelectedButton(selectedButton)
						: setSelectedButton(null);
				}}
				selectedButton={selectedButton}
				setSelectedButton={setSelectedButton}
			/>

			{isJustModalOpen && (
				<AttendanceJustificationModal
					isOpen={isJustModalOpen}
					onClose={() => setIsJustModalOpen(false)}
					setSelectedButton={setSelectedButton}
				/>
			)}
		</>
	);
};

const NavButton = ({
	Click,
	name,
	icon,
	selectedButton,
	setSelectedButton,
}) => {
	return (
		<button
			onClick={() => {
				// Only call setters/callbacks if they're functions
				if (typeof setSelectedButton === "function") setSelectedButton(name);
				if (typeof Click === "function") Click();
			}}
			className={Styles["navbar_button"]}
		>
			{icon && (
				<img
					src={icon}
					alt=""
					className={Styles["navbar_icon"]}
					draggable="false"
				/>
			)}

			<p
				className={`${Styles["navbar_description"]} ${
					selectedButton === name ? Styles["active-button"] : ""
				}`}
			>
				{name}
			</p>
		</button>
	);
};

export default NavBar;
