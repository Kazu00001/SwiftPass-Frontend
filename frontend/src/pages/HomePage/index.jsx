import Layout from '../Layout';
import AttendanceMonitor from './components/AttendanceMonitor';
import Dashboard from './components/Dashboard';
import { getTypeUser } from "../../utils/env";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../../utils/Auth.js";

const HomePage = () => {
const navigate = useNavigate();

	useEffect(() => {
		// Si el usuario no es admin, limpiamos credenciales y redirigimos al login
		const userType = getTypeUser();
    console.log("User type in HomePage:", userType);
		if (userType !== "admin") {
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
      <AttendanceMonitor/>
      <Dashboard/>
    </Layout>
  );
};
export default HomePage;