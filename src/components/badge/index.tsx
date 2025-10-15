import styles from './index.module.css';

interface BadgeProps {
  label: string;
  variant?: 'blue' | 'green' | 'purple';
}

export default function Badge({ label, variant = 'blue' }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
