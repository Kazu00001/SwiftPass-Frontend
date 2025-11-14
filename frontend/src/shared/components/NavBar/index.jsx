import React from "react";
import Styles from "./NavBar.module.css";
import TeacherSearchModal from "../TeacherSearchModal";
import RequestSearchModal from "../RequestSearchModal";
import AttendanceJustificationModal from "../AttendanceJustificationModal";
import DownloadReportModal from "../DownloadReportModal";

const searchIcon = "/Graphics/icons/lupaW.png";
const reportIcon = "/Graphics/icons/reports.png";
const notiIcon = "/Graphics/icons/noti.png";
const requestIcon = "/Graphics/icons/circle.png";

const credencial = "admin";

const NavBar = () => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
	const [isJustModalOpen, setIsJustModalOpen] = React.useState(false);
	const [selectedButton, setSelectedButton] = React.useState(null);
	const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);

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
							<NavButton name="Reporte" icon={reportIcon} />
						</>
					)}
				</nav>

				<button className={Styles["logout_button"]}>
					<div className={Styles["logout_profile_photo-container"]}>
						<img src="/Graphics/icons/profile.png" alt="" />
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
				setSelectedButton(name);
				Click();
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
