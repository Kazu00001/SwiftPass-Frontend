import Layout from "../Layout";
import Styles from "./TeacherPage.module.css";
import AttendanceTeacherCalendar from "./components/AttendanceTeacherCalendar";
import TeacherRequestsCard from "./components/TeacherRequestsCard";
import AttendanceStats from "./components/AttendanceStats";
import ClockCard from "./components/ClockCard";
import { getTypeUser } from "../../utils/env";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../../utils/Auth.js";

const TeacherPage = () => {
	const navigate = useNavigate();

		useEffect(() => {
			// Si el usuario no es maestro, limpiamos credenciales y redirigimos al login
			const userType = getTypeUser();
      console.log("User type in TeacherPage:", userType);
			if (userType !== "maestro") {
			try {
				clearAuthToken();
				// eliminar cookie token si existe
				try {
					document.cookie = "token=; Max-Age=0; path=/";
				} catch (e) {
					// ignore
				}
			} catch (e) {
				console.warn("Failed to clear auth token", e);
			}
			navigate("/", { replace: true });
		}
	}, [navigate]);

	return (
		<Layout>
			<div className={Styles["teacher_page_container"]}>
				<div className={Styles["top_container"]}>
					<div className={Styles["attendance_calendar_container"]}>
						<AttendanceTeacherCalendar isAdmin={true} />
					</div>
					<div className={Styles["stats_main_container"]}>
						<ClockCard />
						<AttendanceStats />
					</div>
				</div>
				<div className={Styles["requests_main_container"]}>
					<TeacherRequestsCard />
				</div>
			</div>
		</Layout>
	);
};

export default TeacherPage;
