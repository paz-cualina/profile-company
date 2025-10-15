import type { ColumnDef } from '@tanstack/react-table';
import type { CompanyWithId, CustomerBase } from '../../../api/models/company/company.model';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { getBadge } from '../utils/helpers';
import { formatNumber } from '../../../utils/helpers';
import styles from './index.module.css';

export const getColumns = (
  onView: (companyId: number) => void,
  onEdit: (companyId: number) => void,
  onDelete: (companyId: number) => void
): ColumnDef<CompanyWithId>[] => [
  {
    header: 'Name',
    accessorKey: 'company_name',
    enableSorting: true,
  },
  { header: 'Industry', accessorKey: 'industry' },
  {
    header: 'Revenue',
    accessorKey: 'revenue',
    enableSorting: true,
    cell: ({ row }) => {
      const val = row.getValue('revenue');
      return <span>{formatNumber(val as number)}</span>;
    },
  },
  {
    header: 'Employees',
    accessorKey: 'employee_count',
    enableSorting: true,
    cell: ({ row }) => {
      const val = row.getValue('employee_count');
      return <span>{formatNumber(val as number)}</span>;
    },
  },
  {
    header: 'Customer Base',
    accessorKey: 'customer_base',
    cell: ({ row }) => {
      return getBadge(row.getValue('customer_base') as CustomerBase);
    },
  },
  {
    header: 'Stock Symbol',
    accessorKey: 'stock_symbol',
    enableSorting: true,
  },
  {
    header: '',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const companyId = row.original.id;
      return (
        <div className={styles.actionsWrapper}>
          <span className={styles.icon} onClick={() => onView(companyId)}>
            <FontAwesomeIcon icon={faEye} />
          </span>
          <span className={styles.icon} onClick={() => onEdit(companyId)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
          <span
            className={classNames(styles.deleteIcon, styles.icon)}
            onClick={() => {
              onDelete(companyId);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      );
    },
  },
];
