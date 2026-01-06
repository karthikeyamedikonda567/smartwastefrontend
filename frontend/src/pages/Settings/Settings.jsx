import { Settings as SettingsIcon } from 'lucide-react';
import { Card } from '../../components/ui';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Configure system preferences and account settings</p>
      </div>
      <Card>
        <div className={styles.placeholder}>
          <SettingsIcon size={48} />
          <h2>System Settings</h2>
          <p>Configure your account preferences, notification settings, and system parameters.</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
