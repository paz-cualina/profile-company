import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { CompanyWithId } from '../../../api/models/company/company.model';
import {
  useCreateCompanyMutation,
  useEditCompanyMutation,
} from '../../../api/services/company/company.service';
import type { CustomerBase } from '../../../api/models/company/company.model';
import { useToast } from '../../../context/toast-context';
import { ToastEnum } from '../../../types/enum/toast.enum';
import { useEffect, useRef } from 'react';
import { formatToMMDDYYYY, formatToYYYYMMDD } from '../utils/helpers';
import Button from '../../../components/button';
import styles from './index.module.css';

interface EditAddCompanyFormProps {
  company?: CompanyWithId;
  onSuccess?: () => void;
}

type FormValues = {
  company_name: string;
  industry: string;
  revenue?: number | '';
  employee_count?: number | '';
  founded_date?: string | null;
  ceo_name?: string;
  headquarters_address?: string;
  headquarters_iframe?: string;
  website?: string;
  stock_symbol: string;
  customer_base: string;
};

const EditAddCompanyForm = ({ company, onSuccess }: EditAddCompanyFormProps) => {
  const [createCompany, { isLoading: creating }] = useCreateCompanyMutation();
  const [editCompany, { isLoading: editing }] = useEditCompanyMutation();

  const { showToast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isEditMode = !!company;

  const initialValues: FormValues = {
    company_name: company?.company_name ?? '',
    industry: company?.industry ?? '',
    revenue: company?.revenue ?? '',
    employee_count: company?.employee_count ?? '',
    // don't set a default date for new companies; keep undefined/null so input stays empty
    founded_date: company?.founded_date ? formatToYYYYMMDD(company.founded_date) : undefined,
    ceo_name: company?.ceo_name ?? '',
    headquarters_address: company?.headquarters_address ?? '',
    headquarters_iframe: company?.headquarters_iframe ?? '',
    website: company?.website ?? '',
    stock_symbol: company?.stock_symbol ?? '',
    customer_base: company?.customer_base ?? '',
  };

  const validate = (values: FormValues) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.company_name) errors.company_name = 'Name is required';
    if (!values.industry) errors.industry = 'Industry is required';
    if (!values.stock_symbol) errors.stock_symbol = 'Stock symbol is required';
    if (!values.customer_base) errors.customer_base = 'Customer base is required';
    return errors;
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isEditMode && company) {
        await editCompany({
          id: company.id,
          ...({
            ...(values as unknown as Partial<Record<string, unknown>>),
            founded_date: values.founded_date ? formatToMMDDYYYY(values.founded_date) : null,
          } as Partial<Record<string, unknown>>),
          customer_base: values.customer_base as CustomerBase,
        }).unwrap();
        showToast(ToastEnum.success, 'Company updated successfully!');
      } else {
        await createCompany({
          ...({
            ...(values as unknown as Partial<Record<string, unknown>>),
            founded_date: values.founded_date ? formatToMMDDYYYY(values.founded_date) : null,
          } as Partial<Record<string, unknown>>),
          customer_base: values.customer_base as CustomerBase,
        }).unwrap();
        showToast(ToastEnum.success, 'Company created successfully!');
      }
      if (onSuccess) onSuccess();
    } catch {
      showToast(ToastEnum.error, 'Something has been failed! Please try again.');
    }
  };

  const iframeExample = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4986482872982!2d-56.07512161047275!3d-34.791884647873246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a0290108ed868d%3A0xca8e3961ebff487f!2sZonamerica!5e0!3m2!1ses-419!2sar!4v1760307980266!5m2!1ses-419!2sar" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.content}>
              <div className={styles.field}>
                <label htmlFor="company_name">Company Name*</label>
                <Field
                  id="company_name"
                  name="company_name"
                  placeholder="Enter company name"
                  innerRef={inputRef}
                />
                <ErrorMessage name="company_name" component="span" className={styles.error} />
              </div>

              <div className={styles.twoColumns}>
                <div className={styles.field}>
                  <label htmlFor="ceo_name">CEO's Full Name</label>
                  <Field id="ceo_name" name="ceo_name" placeholder="Enter CEO's Full Name" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="founded_date">Founded Date</label>
                  <Field
                    type="date"
                    id="founded_date"
                    name="founded_date"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="headquarters_address">Headquarters Address</label>
                <Field
                  id="headquarters_address"
                  name="headquarters_address"
                  placeholder="Enter address"
                />
              </div>

              <div className={styles.field}>
                <span>
                  <label htmlFor="headquarters_iframe">Headquarters Iframe</label>
                  <span className={styles.hint}>(Embed from Google Maps)</span>
                </span>
                <Field
                  as="textarea"
                  id="headquarters_iframe"
                  name="headquarters_iframe"
                  placeholder={iframeExample}
                  rows={4}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="website">Website's URL</label>
                <Field
                  id="website"
                  name="website"
                  placeholder="Enter website's URL"
                  className={styles.website}
                />
              </div>

              <div className={styles.twoColumns}>
                <div className={styles.field}>
                  <label htmlFor="industry">Industry*</label>
                  <Field as="select" id="industry" name="industry">
                    <option value="">Select industry</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                  </Field>
                  <ErrorMessage name="industry" component="span" className={styles.error} />
                </div>

                <div className={styles.field}>
                  <span>
                    <label htmlFor="revenue">Revenue</label>
                    <span className={styles.hint}>(USD)</span>
                  </span>
                  <Field
                    id="revenue"
                    name="revenue"
                    placeholder="Enter revenue value"
                    type="number"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="employee_count">Employees Quantity</label>
                <Field
                  id="employee_count"
                  name="employee_count"
                  placeholder="Enter employee quantity"
                  type="number"
                />
              </div>

              <div className={styles.twoColumns}>
                <div className={styles.field}>
                  <label htmlFor="stock_symbol">Stock Symbol*</label>
                  <Field id="stock_symbol" name="stock_symbol" placeholder="Select stock symbol" />
                  <ErrorMessage name="stock_symbol" component="span" className={styles.error} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="customer_base">Customer Base*</label>
                  <Field as="select" id="customer_base" name="customer_base">
                    <option value="">Select customer base</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Government">Government</option>
                  </Field>
                  <ErrorMessage name="customer_base" component="span" className={styles.error} />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <Button variant="secondary" text="Cancel" onClick={() => onSuccess && onSuccess()} />
              <Button
                variant="primary"
                text={isEditMode ? 'Save Changes' : 'Create Company'}
                disabled={creating || editing || isSubmitting}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAddCompanyForm;
