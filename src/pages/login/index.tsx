import Logo from '../../assets/logo.svg';
import LoginForm from './components/login-form';
import styles from './index.module.css';

export default function Login() {
  return (
    <main className={styles.login}>
      <div className={styles.backgroundImage} />
      <div className={styles.box}>
        <img src={Logo} className={styles.logo} alt="Logo WTI" />
        <LoginForm />
      </div>
    </main>
  );
}
