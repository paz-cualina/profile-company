import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';
import { MenuItems } from '../components/sidebar/navigation';
import styles from './index.module.css';

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <Sidebar menu={MenuItems} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
