import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../button';
import styles from './index.module.css';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onSave: () => boolean | void | Promise<boolean | void>;
  onClose: () => void;
  textBtnConfirm?: string;
  isDanger?: boolean;
}

export default function Modal({
  title,
  children,
  isOpen = false,
  onSave,
  onClose,
  textBtnConfirm = 'Confirm',
  isDanger = false,
}: ModalProps) {
  const handleSave = async () => {
    if (onSave) {
      const shouldClose = await onSave();
      if (shouldClose !== false) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const modalClasses = classNames(styles.modal, {
    [styles.open]: isOpen,
  });

  // If the modal is not open, return null to avoid rendering
  if (!isOpen) {
    return null;
  }

  const btnIsDanger = isDanger ? 'danger' : 'primary';

  return (
    <div className={modalClasses}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.closeBtn} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.content}>{children}</div>
          <div className={styles.btnWrapper}>
            <Button text="Cancel" variant="dark" onClick={onClose} />
            <Button text={textBtnConfirm} variant={btnIsDanger} onClick={handleSave} />
          </div>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
