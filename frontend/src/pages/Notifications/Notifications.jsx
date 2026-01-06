import { Bell } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Notifications.module.css';

const Notifications = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>View and manage system notifications and alerts</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Bell size={48} />
          <h2>Notifications Center</h2>
          <p>View alerts, system notifications, and important updates about your waste management operations.</p>
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
