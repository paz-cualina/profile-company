import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { routes } from '../../routes/routes';

export type MenuItem = {
  label: string;
  icon: ReactElement;
  href?: string;
};

export const MenuItems: MenuItem[] = [
  {
    href: routes.home,
    label: 'Home',
    icon: <FontAwesomeIcon icon={faHouse} />,
  },
  { href: routes.companies, label: 'Companies', icon: <FontAwesomeIcon icon={faRectangleList} /> },
];
