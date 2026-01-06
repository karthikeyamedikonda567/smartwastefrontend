import { Receipt } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Billing.module.css';

const Billing = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Billing</h1>
        <p className={styles.subtitle}>Manage invoices, payments, and billing records</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Receipt size={48} />
          <h2>Billing Management</h2>
          <p>Handle customer billing, generate invoices, and track payment history.</p>
        </div>
      </Card>
    </div>
  );
};

export default Billing;
