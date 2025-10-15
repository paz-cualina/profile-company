import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type FiltersProps = {
  name?: string;
  onNameChange?: (v: string) => void;
  industry?: string;
  onIndustryChange?: (v: string) => void;
  customerBase?: string;
  onCustomerBaseChange?: (v: string) => void;
};

export function Filters({
  name = '',
  onNameChange,
  industry = '',
  onIndustryChange,
  customerBase = '',
  onCustomerBaseChange,
}: FiltersProps) {
  return (
    <div className={styles.box}>
      <span className={styles.title}>Filters</span>
      <div className={styles.filtersContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => onNameChange && onNameChange(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
        </div>
        <div className={styles.inputWrapper}>
          <select
            value={industry}
            onChange={(e) => onIndustryChange && onIndustryChange(e.target.value)}
          >
            <option value="">Filter by industry</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
        <div className={styles.inputWrapper}>
          <select
            value={customerBase}
            onChange={(e) => onCustomerBaseChange && onCustomerBaseChange(e.target.value)}
          >
            <option value="">Filter by customer base</option>
            <option value="Small Business">Small Business</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Government">Government</option>
          </select>
        </div>
      </div>
    </div>
  );
}
