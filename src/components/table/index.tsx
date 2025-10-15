'use client';

import { useState } from 'react';
import type { ColumnDef, Column, SortingState, RowData } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Button from '../button';
import styles from './index.module.css';

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '@tanstack/react-table' {
  // Enable type-safe column meta for custom cell/header props if needed later
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    headerClassName?: string;
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialPageSize?: number;
  getRowId?: (originalRow: TData, index: number, parent?: unknown) => string;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
};

/**
 * Generic data table built on TanStack Table v8.
 * - Sorting (click on sortable headers)
 * - Pagination (client-side)
 */
export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  initialPageSize = 10,
  getRowId,
  onRowClick,
  emptyMessage = 'No data',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: initialPageSize } },
    getRowId,
    defaultColumn: { enableSorting: false },
  });

  const renderSortIcon = (column: Column<TData, unknown>) => {
    if (!column.getCanSort?.()) return null;
    const dir = column.getIsSorted?.() as false | 'asc' | 'desc';
    if (!dir) return <FontAwesomeIcon icon={faArrowDown} />;
    return dir === 'asc' ? (
      <FontAwesomeIcon icon={faArrowUp} />
    ) : (
      <FontAwesomeIcon icon={faArrowDown} />
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.scrollWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const meta = header.column.columnDef?.meta as { headerClassName?: string };
                  return (
                    <th
                      key={header.id}
                      className={`${styles.th} ${canSort ? styles.sortable : ''} ${meta?.headerClassName || ''}`}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {renderSortIcon(header.column)}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={classNames(styles.tr, { [styles.trClickable]: !!onRowClick })}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => {
                    const tdClassName =
                      ((cell.column.columnDef?.meta as unknown as Record<string, unknown>)
                        ?.tdClassName as string) || '';
                    const content = flexRender(cell.column.columnDef.cell, cell.getContext());
                    return (
                      <td key={cell.id} className={classNames(styles.td, tdClassName)}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
        </div>
        <div className={styles.paginationButtons}>
          <Button
            variant="primary"
            size="small"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
          />
          <Button
            variant="primary"
            size="small"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            icon={<FontAwesomeIcon icon={faChevronRight} />}
          />
        </div>
      </div>
    </div>
  );
}

export type { ColumnDef };
