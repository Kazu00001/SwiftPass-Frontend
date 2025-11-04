import { apiRequest } from "../../Plugins";
import { API_URL } from "../../utils/env.js";
import { useNavigate } from 'react-router-dom';

export default function useSignIn() {
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const [username, password] = e.target.elements;

    try {
      console.log(username.value, password.value);
      const response = await apiRequest(
        "post",
        `${API_URL}/api/login`,
        {
          username: username.value,
          password: password.value,
        },
        {},
        false
      );
      if (response.status === 200) {
        sessionStorage.setItem("jwt", JSON.stringify(response.data.token));
        
        navigate('/HomePage', { replace: true });
      }
      console.log("Login successful:", response.data);

      return;
    } catch (error) {
      console.error('SignIn error:', error);
    }
  };
  return { signIn };
}
