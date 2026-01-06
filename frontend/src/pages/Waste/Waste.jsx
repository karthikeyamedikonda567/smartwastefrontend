import { Recycle } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Waste.module.css';

const Waste = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Waste Categories</h1>
        <p className={styles.subtitle}>Manage and categorize different types of waste</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Recycle size={48} />
          <h2>Waste Categories Management</h2>
          <p>Define and manage waste categories, recycling guidelines, and disposal methods.</p>
        </div>
      </Card>
    </div>
  );
};

export default Waste;
