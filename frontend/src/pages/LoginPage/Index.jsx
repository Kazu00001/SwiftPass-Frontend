import Styles from "./LoginPage.module.css";
import useSignIn from "./useSignIn.js";
import InputForm from "../../shared/components/InputForm";
const loginImage = "./Graphics/login-image.png";

export default function LoginPage() {
  const { signIn } = useSignIn();
  return (
    <div className={Styles["login_page"]}>
      <div className={Styles["login_container"]}>
        <section className={Styles["login_title_section"]}>
          <img
            src={loginImage}
            alt=""
            className={Styles["login_image"]}
            draggable="false"
          />
          <h1 className={Styles["login_title"]}>Swift-Pass</h1>
        </section>
        <section className={Styles["login_form_section"]}>
          <h1 className={Styles["login_form_title"]}>Iniciar Sesión</h1>
          <form onSubmit={signIn} style={{ display: "contents" }}>
            <InputForm
              title="Email"
              name="username"
              type="email"
              Width="100%"
              Height="50px"
              onChange={() => {}}
            />
            <InputForm
              title="Password"
              name="password"
              type="password"
              Width="100%"
              Height="50px"
              onChange={() => {}}
            />
            <button type="submit" className={Styles["login_form_button"]}>
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
