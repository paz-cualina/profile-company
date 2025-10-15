import { Link } from 'react-router-dom';
import styles from './index.module.css';
import ToggleSwitch from '../../../../components/switch';

export default function RememberForgotActions() {
  return (
    <div className={styles.actionsWrapper}>
      <ToggleSwitch labelName="Remember me" />
      <Link
        className={styles.forgotPassword}
        onClick={() => alert('Forgot Password clicked')}
        to={''}
      >
        Forgot your password?
      </Link>
    </div>
  );
}
