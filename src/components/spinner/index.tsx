import styles from './index.module.css';

interface SpinnerProps {
  color?: string;
  height?: number;
  width?: number;
}

export default function Spinner({ color, height, width }: SpinnerProps) {
  return (
    <div className={styles.spinnerWrapper}>
      <span
        style={{
          color: color || '#5a65cdff',
          height: height || 50,
          width: width || 50,
        }}
        className={styles.spinner}
      ></span>
    </div>
  );
}
