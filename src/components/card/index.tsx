import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import type { CompanyMetrics } from '../../types/metric.type';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CardProps {
  company: CompanyMetrics;
}

export default function Card({ company }: CardProps) {
  const companyHasIncreased = company.growth.startsWith('+');

  return (
    <li key={company.title} className={styles.card}>
      <span className={styles.title}>{company.title}</span>
      <span className={styles.currentCompanies}>{company.currentCompanies}</span>
      <div className={`${styles.growthContainer} ${companyHasIncreased ? '' : styles.decrease}`}>
        <FontAwesomeIcon icon={faChartLine} />
        <span className={styles.growth}>{company.growth} from last 4 months</span>
      </div>
      <span className={styles.legend}>{company.legend}</span>
    </li>
  );
}
