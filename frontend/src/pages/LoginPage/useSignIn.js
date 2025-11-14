import { apiRequest } from "../../Plugins";
import { API_URL } from "../../utils/env.js";
import { useNavigate } from "react-router-dom";
import { setAuthToken, decodeJwtPayload } from "../../utils/Auth.js";

export default function useSignIn() {
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const [username, password] = e.target.elements;

    try {
      const response = await apiRequest(
        "post",
        `${API_URL}/api/login`,
        { username: username.value, password: password.value },
        {},
        false
      );

      if (response?.status === 200 && response.data?.token) {
        const token = response.data.token;

        // Guarda el token en storage de forma consistente
        setAuthToken(token, { persist: true }); // usa tu helper central

        // Extrae rol desde el payload del JWT
        const payload = decodeJwtPayload(token) || {};
        const userType = payload?.rol ?? payload?.role ?? payload?.userType ?? null;

        if (userType === "admin") {
          navigate("/HomePage", { replace: true });
          return;
        }
        if (userType === "maestro") {
          navigate("/TeacherPage", { replace: true });
          return;
        }

        // fallback razonable
        navigate("/HomePage", { replace: true });
      } else {
        // manejar error de credenciales: response no es 200 o no vino token
        console.error("Login failed or no token in response", response);
        // aquí podrías lanzar un toast o establecer un estado de error
      }
    } catch (error) {
      console.error("SignIn error:", error);
      // mostrar error al usuario
    }
  };

  return { signIn };
}
