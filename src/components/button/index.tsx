import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

interface BaseButtonProps {
  text?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dark';
  width?: 'fit-content' | 'full';
  size?: 'small' | 'regular';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
}

export default function Button({
  text,
  icon,
  variant = 'primary',
  width = 'fit-content',
  size = 'regular',
  type = 'button',
  onClick,
  to,
  disabled,
  ...rest
}: BaseButtonProps) {
  const buttonClass = classNames(styles.btn, styles[`btn-${variant}`], styles[`width-${width}`], {
    [styles['btn-only-icon']]: icon && !text,
    [styles['btn-with-icon']]: icon && text,
    [styles['size-sm']]: size === 'small',
    [styles['btn-link']]: to,
  });

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {icon && text ? (
          <>
            {icon}
            <span>{text}</span>
          </>
        ) : (
          <>{text && <span>{text}</span>}</>
        )}
      </Link>
    );
  }

  if (icon && !text) {
    return (
      <button type={type} className={buttonClass} onClick={onClick} {...rest} disabled={disabled}>
        {icon}
      </button>
    );
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...rest} disabled={disabled}>
      {icon && text ? (
        <>
          {icon}
          <span>{text}</span>
        </>
      ) : (
        <>{text && <span>{text}</span>}</>
      )}
    </button>
  );
}
