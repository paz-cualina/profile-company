import { useGetCompanyByIdQuery } from '../../../api/services/company/company.service';
import type { CompanyWithId } from '../../../api/models/company/company.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { getBadge, sanitizeHeadquartersIframe } from '../utils/helpers';
import Spinner from '../../../components/spinner';
import Button from '../../../components/button';
import styles from './index.module.css';
import { formatNumber } from '../../../utils/helpers';

interface CompanyDetailsProps {
  companyId: CompanyWithId;
  handleClose: () => void;
  handleEdit: () => void;
}

export default function CompanyDetails({
  companyId,
  handleClose,
  handleEdit,
}: CompanyDetailsProps) {
  const { data: company, isLoading } = useGetCompanyByIdQuery(companyId.id);

  if (!company && !isLoading) return <div className={styles.container}>Company not found.</div>;

  if (isLoading)
    return (
      <div className={styles.centerContent}>
        <Spinner />
      </div>
    );

  const iframeBox = () => {
    return (
      <div className={styles.iframeContainer}>
        {(() => {
          const iframe = company?.headquarters_iframe;
          const sanitized = sanitizeHeadquartersIframe(iframe);
          if (sanitized.type === 'none') return <p>No map available</p>;
          if (sanitized.type === 'src')
            return (
              <iframe
                src={sanitized.src}
                width="100%"
                height={300}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            );
          if (sanitized.type === 'html')
            return <div dangerouslySetInnerHTML={{ __html: sanitized.html }} />;
          return null;
        })()}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>
          <span className={styles.label}>CEO:</span> {company?.ceo_name ?? '-'}
        </p>
        <p>
          <span className={styles.label}>Founded Date:</span> {company?.founded_date ?? '-'}
        </p>
        <p>
          <span className={styles.label}>Headquarters:</span> {company?.headquarters_address ?? '-'}
        </p>
        <div className={styles.mapContainer}>{iframeBox()}</div>
        <p>
          <span className={styles.label}>Industry:</span> {company?.industry ?? '-'}
        </p>
        <p>
          <span className={styles.label}>Revenue:</span> {formatNumber(company?.revenue ?? '-')}
        </p>
        <p>
          <span className={styles.label}>Employees:</span>{' '}
          {formatNumber(company?.employee_count ?? '-')}
        </p>
        <p>
          <span className={styles.label}>Stock Symbol:</span> {company?.stock_symbol ?? '-'}
        </p>
        <p>
          <span className={styles.label}>Customer Base:</span> {getBadge(company?.customer_base)}
        </p>
        <p className={styles.website}>
          {company?.website ? (
            <a href={String(company.website)} target="_blank" rel="noopener noreferrer">
              <span>visit website </span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          ) : (
            '-'
          )}
        </p>
      </div>
      <div className={styles.footer}>
        <Button variant="secondary" text="Cancel" onClick={handleClose} />
        <Button variant="primary" text="Edit Company" onClick={handleEdit} />
      </div>
    </div>
  );
}
