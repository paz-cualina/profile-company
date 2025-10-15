'use client';

import { NavLink } from 'react-router-dom';
import { MenuItems } from './navigation';
import type { MenuItem } from './navigation';
import logo from '../../assets/logo-name.svg';
import profile from '../../assets/profile.jpg';
import styles from './index.module.css';

export interface SidebarProps {
  menu: MenuItem[];
}

export function Sidebar({ menu = MenuItems }: SidebarProps) {
  return (
    <aside className={styles.sidebarContainer}>
      <img src={logo} alt="Logo" className={styles.sidebarLogo} />
      <nav className={styles.sidebarMenu}>
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.href || '#'}
            className={({ isActive }) =>
              isActive ? `${styles.sidebarMenuItem} ${styles.active}` : styles.sidebarMenuItem
            }
            end
          >
            <span className={styles.sidebarMenuIcon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.userSettings}>
        <img src={profile} alt="Profile" className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>Tamara Sancristobal</span>
          <span>Account settings</span>
        </div>
      </div>
    </aside>
  );
}
