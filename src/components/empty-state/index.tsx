import styles from './index.module.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

//TODO: Add icon
export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
