import { Leaf } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Recycling.module.css';

const Recycling = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recycling</h1>
        <p className={styles.subtitle}>Track recycling programs and sustainability metrics</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <Leaf size={48} />
          <h2>Recycling Programs</h2>
          <p>Monitor recycling initiatives, track sustainability goals, and view environmental impact metrics.</p>
        </div>
      </Card>
    </div>
  );
};

export default Recycling;
