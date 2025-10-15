import styles from './index.module.css';

interface ToggleSwitchProps {
  labelName?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleSwitch({ labelName, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className={styles.toggleSwitch}>
      <label htmlFor="switch" className={styles.switch}>
        <input type="checkbox" id="switch" checked={checked} onChange={onChange} />
        <span className={styles.slider}></span>
      </label>
      <p>{labelName}</p>
    </div>
  );
}
