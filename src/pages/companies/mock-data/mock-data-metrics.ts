import type { CompanyMetrics } from '../../../types/metric.type';

export const companyMetricsList: CompanyMetrics[] = [
  {
    title: 'Total Companies',
    currentCompanies: 32,
    growth: '+15',
    legend: 'Total managed companies',
  },
  {
    title: 'Total Enterprise',
    currentCompanies: 10,
    growth: '+10',
    legend: 'Currently Enterprise managed',
  },
  {
    title: 'Total Government',
    currentCompanies: 8,
    growth: '+15',
    legend: 'Currently Government managed',
  },
  {
    title: 'Total Small Business',
    currentCompanies: 14,
    growth: '-5',
    legend: 'Currently Small Business managed',
  },
];
