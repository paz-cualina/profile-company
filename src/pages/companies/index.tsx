import { useMemo, useState, Suspense, lazy } from 'react';
import { useToast } from '../../context/toast-context';
import type { CompanyMetrics } from '../../types/metric.type';
import { companyMetricsList } from './mock-data/mock-data-metrics';
import {
  useDeleteCompanyMutation,
  useGetCompanyListQuery,
} from '../../api/services/company/company.service';
import { DataTable } from '../../components/table';
import type { CompanyWithId } from '../../api/models/company/company.model';
import { getColumns } from './header-table';
import { Drawer } from '../../components/drawer';
import { Filters } from '../../components/filters';
import { ToastEnum } from '../../types/enum/toast.enum';
import EmptyState from '../../components/empty-state';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import Card from '../../components/card';
import Modal from '../../components/modal';
import styles from './index.module.css';

const EditAddCompanyForm = lazy(() => import('./edit-add-company-form'));
const CompanyDetails = lazy(() => import('./company-details'));

export default function Companies() {
  const { showToast } = useToast();

  const companyMetrics = companyMetricsList || [];
  const { data, error, isLoading: loading } = useGetCompanyListQuery();

  const companyList = useMemo(() => (data as CompanyWithId[]) || [], [data]);
  const [nameFilter, setNameFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [customerBaseFilter, setCustomerBaseFilter] = useState('');

  const [companySelected, setCompanySelected] = useState<CompanyWithId | null>(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit' | 'view'>('add');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const filteredCompanies = useMemo(() => {
    const name = nameFilter.trim().toLowerCase();
    const industry = industryFilter.trim().toLowerCase();
    const customerBase = customerBaseFilter.trim().toLowerCase();

    return companyList.filter((c) => {
      const matchesName = !name || c.company_name.toLowerCase().includes(name);
      const matchesIndustry = !industry || (c.industry || '').toLowerCase() === industry;
      const matchesCustomerBase =
        !customerBase || (c.customer_base || '').toLowerCase() === customerBase;
      return matchesName && matchesIndustry && matchesCustomerBase;
    });
  }, [companyList, nameFilter, industryFilter, customerBaseFilter]);

  const handleView = (id: number) => {
    const found = companyList.find((company) => company.id === id) || null;
    setCompanySelected(found);
    setDrawerMode('view');
    setDrawerIsOpen(true);
  };

  const handleEdit = (id: number) => {
    const found = companyList.find((company) => company.id === id) || null;
    setCompanySelected(found);
    setDrawerMode('edit');
    setDrawerIsOpen(true);
  };

  const [deleteCompany] = useDeleteCompanyMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteCompany({ id }).unwrap();
      showToast(ToastEnum.success, 'Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company', error);
      showToast(ToastEnum.error, 'An error occurred. Could not delete the company.');
    }
  };

  const handleDeleteModal = (id: number) => {
    const found = companyList.find((company) => company.id === id) || null;
    setCompanySelected(found);
    setModalIsOpen(true);
  };

  if (loading) {
    return (
      <div className={styles.centerContent}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centerContent}>
        <EmptyState title="Something went wrong. Please try again later." />
      </div>
    );
  }

  return (
    <>
      <main className={styles.page}>
        <div className={styles.header}>
          <h1>Companies</h1>
          <Button
            text="Add Company"
            onClick={() => {
              setCompanySelected(null);
              setDrawerMode('add');
              setDrawerIsOpen(true);
            }}
          />
        </div>
        <div className={styles.metricsContainer}>
          <p>Total Companies' Metrics</p>
          <ul className={styles.cards}>
            {companyMetrics.map((company: CompanyMetrics) => (
              <Card key={company.title} company={company} />
            ))}
          </ul>
        </div>
        <Filters
          name={nameFilter}
          onNameChange={setNameFilter}
          industry={industryFilter}
          onIndustryChange={setIndustryFilter}
          customerBase={customerBaseFilter}
          onCustomerBaseChange={setCustomerBaseFilter}
        />
        <DataTable<CompanyWithId>
          data={filteredCompanies}
          columns={getColumns(handleView, handleEdit, handleDeleteModal)}
          initialPageSize={8}
        />
      </main>

      <Drawer
        open={drawerIsOpen}
        onOpenChange={setDrawerIsOpen}
        title={
          drawerMode === 'view'
            ? (companySelected?.company_name ?? companySelected?.company_name ?? 'Company Details')
            : companySelected
              ? 'Edit Company'
              : 'Add New Company'
        }
      >
        <Suspense>
          {drawerMode === 'view' && companySelected ? (
            <CompanyDetails
              companyId={companySelected}
              handleEdit={() => handleEdit(companySelected.id)}
              handleClose={() => {
                setDrawerIsOpen(false);
                setCompanySelected(null);
              }}
            />
          ) : (
            <EditAddCompanyForm
              company={companySelected || undefined}
              onSuccess={() => {
                setDrawerIsOpen(false);
                setCompanySelected(null);
              }}
            />
          )}
        </Suspense>
      </Drawer>

      <Modal
        title="Delete Company"
        isOpen={modalIsOpen}
        onSave={() => {
          if (companySelected !== null) {
            handleDelete(companySelected.id);
            setModalIsOpen(false);
            setCompanySelected(null);
          }
          return true;
        }}
        onClose={() => {
          setModalIsOpen(false);
          setCompanySelected(null);
        }}
        textBtnConfirm="Delete"
        isDanger={true}
      >
        Are you sure you want to delete this company? This action can’t be undone.
      </Modal>
    </>
  );
}
