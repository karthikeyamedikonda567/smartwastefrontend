import { FileText } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Reports.module.css';

const Reports = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reports</h1>
        <p className={styles.subtitle}>Generate and view operational reports</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <FileText size={48} />
          <h2>Reports & Analytics</h2>
          <p>Generate detailed reports on collections, recycling rates, and operational efficiency.</p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
