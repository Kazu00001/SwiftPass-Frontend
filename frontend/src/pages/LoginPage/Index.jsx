import Styles from './LoginPage.module.css';

import InputForm from '../../shared/components/InputForm';
const loginImage = './Graphics/login-image.png';

export default function LoginPage() {
  return (
    <div className={Styles['login_page']}>
        <div className={Styles['login_container']}>
            <section className={Styles['login_title_section']}>
                <img 
                    src={loginImage} 
                    alt="" 
                    className={Styles['login_image']}
                    draggable="false"
                />
                <h1 className={Styles['login_title']}>Swift-Pass</h1>
            </section>
            <section className={Styles['login_form_section']}>
                <h1 className={Styles['login_form_title']}>Iniciar Sesión</h1>
                 <InputForm
                    title="Email"
                    type="email"
                    Width="100%"
                    Height="50px"
                    onChange={() => {}}
                />
                <InputForm
                    title="Password"
                    type="password"
                    Width="100%"
                    Height="50px"
                    onChange={() => {}}
                />
                <button className={Styles['login_form_button']}>Login</button>
            </section>
        </div>

    </div>
  );
}