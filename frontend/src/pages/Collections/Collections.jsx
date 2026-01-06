import { Truck } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Collections.module.css';

const Collections = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Collections</h1>
        <p className={styles.subtitle}>Manage waste collection schedules and routes</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Truck size={48} />
          <h2>Collections Management</h2>
          <p>Track and manage waste collection activities, routes, and vehicle assignments.</p>
        </div>
      </Card>
    </div>
  );
};

export default Collections;
