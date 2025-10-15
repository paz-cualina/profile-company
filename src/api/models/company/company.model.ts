export type CustomerBase = 'Small Business' | 'Enterprise' | 'Government';

export interface Company {
  company_name: string;
  industry: string;
  revenue?: number;
  employee_count?: number;
  founded_date?: string;
  ceo_name?: string;
  headquarters_address?: string;
  headquarters_iframe?: string;
  website?: string;
  stock_symbol: string;
  customer_base: CustomerBase;
}

export interface CompanyWithId extends Company {
  id: number;
}
