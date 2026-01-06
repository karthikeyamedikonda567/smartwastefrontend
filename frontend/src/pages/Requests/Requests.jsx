import { MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Requests.module.css';

const Requests = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Service Requests</h1>
        <p className={styles.subtitle}>Manage customer service requests and support tickets</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <MessageSquare size={48} />
          <h2>Service Requests Management</h2>
          <p>Handle customer service requests, complaints, and support tickets efficiently.</p>
        </div>
      </Card>
    </div>
  );
};

export default Requests;
