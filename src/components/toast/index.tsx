import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { ToastEnum } from '../../types/enum/toast.enum';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons/faCircleXmark';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';

interface ToastProps {
  type: ToastEnum;
  message: string;
  onClose?: () => void;
}

export default function Toast({ type, message, onClose }: ToastProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Add the isActive class after the component is mounted
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    const hideTimer = setTimeout(() => {
      setIsActive(false);
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  const toastClass = classNames(styles.toast, {
    [styles.toastSuccess]: type === 'success',
    [styles.toastError]: type === 'error',
    [styles.toastInfo]: type === 'info',
    [styles.isActive]: isActive,
  });

  const renderIcon = () => {
    if (type === 'success') return <FontAwesomeIcon icon={faCircleCheck} />;
    if (type === 'error') return <FontAwesomeIcon icon={faCircleXmark} />;
    return <FontAwesomeIcon icon={faInfo} />;
  };

  return (
    <div className={toastClass}>
      <span className={styles.toastIcon}>{renderIcon()}</span>
      <p>{message}</p>
    </div>
  );
}
