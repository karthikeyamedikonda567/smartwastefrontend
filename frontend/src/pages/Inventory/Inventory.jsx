import { Package } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Inventory.module.css';

const Inventory = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Inventory</h1>
        <p className={styles.subtitle}>Manage bins, vehicles, and equipment inventory</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Package size={48} />
          <h2>Inventory Management</h2>
          <p>Track and manage all waste management assets including bins, trucks, and equipment.</p>
        </div>
      </Card>
    </div>
  );
};

export default Inventory;
