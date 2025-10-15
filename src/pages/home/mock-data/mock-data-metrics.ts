import type { CompanyMetrics } from '../../../types/metric.type';

export const companyMetricsList: CompanyMetrics[] = [
  {
    title: 'Total Companies',
    currentCompanies: 9,
    growth: '+15',
    legend: 'Total managed companies',
  },
  {
    title: 'Total Enterprise',
    currentCompanies: 3,
    growth: '+50',
    legend: 'Currently Enterprise managed',
  },
  {
    title: 'Total Government',
    currentCompanies: 2,
    growth: '+0',
    legend: 'Currently Government managed',
  },
  {
    title: 'Total Small Business',
    currentCompanies: 4,
    growth: '-20',
    legend: 'Currently Small Business managed',
  },
];
