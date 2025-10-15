'use client';

import type { CompanyMetrics } from '../../types/metric.type';
import { companyMetricsList } from './mock-data/mock-data-metrics';
import Card from '../../components/card';
import styles from './index.module.css';

export default function Home() {
  const companyMetrics = companyMetricsList || [];

  return (
    <main className={styles.home}>
      <h1>Hi Tamara Sancristóbal!</h1>
      <div className={styles.metricsContainer}>
        <p>My Companies' Metrics</p>
        <ul className={styles.cards}>
          {companyMetrics.map((company: CompanyMetrics) => (
            <Card key={company.title} company={company} />
          ))}
        </ul>
      </div>
    </main>
  );
}
