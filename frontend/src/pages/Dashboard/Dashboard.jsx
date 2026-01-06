import { useState, useEffect } from 'react';
import {
  Trash2,
  Truck,
  Users,
  TrendingUp,
  AlertTriangle,
  Recycle,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Leaf,
} from 'lucide-react';
import { StatCard, Card, Badge, ProgressBar } from '../../components/ui';
import styles from './Dashboard.module.css';

// Mock data for demonstration
const mockStats = {
  totalBins: 1247,
  binsChange: 12,
  collectionsToday: 89,
  collectionsChange: 8,
  activeUsers: 3421,
  usersChange: 156,
  recyclingRate: 67.5,
  recyclingChange: 4.2,
};

const mockAlerts = [
  { id: 1, type: 'warning', message: 'Bin #B-1042 is 95% full', location: 'Zone A-3', time: '5 min ago' },
  { id: 2, type: 'error', message: 'Collection vehicle CV-07 offline', location: 'Route 12', time: '12 min ago' },
  { id: 3, type: 'info', message: 'New recycling center added', location: 'Downtown', time: '1 hour ago' },
  { id: 4, type: 'warning', message: 'Bin #B-0832 needs maintenance', location: 'Zone B-1', time: '2 hours ago' },
];

const mockZoneData = [
  { zone: 'Zone A', fillLevel: 78, bins: 245, status: 'warning' },
  { zone: 'Zone B', fillLevel: 45, bins: 312, status: 'normal' },
  { zone: 'Zone C', fillLevel: 92, bins: 178, status: 'critical' },
  { zone: 'Zone D', fillLevel: 34, bins: 267, status: 'normal' },
  { zone: 'Zone E', fillLevel: 61, bins: 245, status: 'warning' },
];

const mockRecentCollections = [
  { id: 'COL-001', route: 'Route 5', vehicle: 'CV-03', bins: 45, status: 'completed', time: '09:30 AM' },
  { id: 'COL-002', route: 'Route 12', vehicle: 'CV-07', bins: 38, status: 'in-progress', time: '10:15 AM' },
  { id: 'COL-003', route: 'Route 8', vehicle: 'CV-01', bins: 52, status: 'scheduled', time: '11:00 AM' },
  { id: 'COL-004', route: 'Route 3', vehicle: 'CV-09', bins: 41, status: 'completed', time: '08:45 AM' },
];

const mockWasteBreakdown = [
  { type: 'Organic', percentage: 35, color: '#40916C' },
  { type: 'Recyclable', percentage: 28, color: '#2D6A4F' },
  { type: 'General', percentage: 25, color: '#6B7280' },
  { type: 'Hazardous', percentage: 8, color: '#C2410C' },
  { type: 'E-Waste', percentage: 4, color: '#7C3AED' },
];

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'scheduled': return 'default';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            {greeting}, <span className={styles.highlight}>Admin</span>
          </h1>
          <p className={styles.subtitle}>
            Here's what's happening with your waste management system today.
          </p>
        </div>
        <div className={styles.headerMeta}>
          <div className={styles.dateWidget}>
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Bins"
          value={mockStats.totalBins.toLocaleString()}
          icon={<Trash2 size={24} />}
          change={`+${mockStats.binsChange}`}
          changeType="positive"
          iconColor="primary"
        />
        <StatCard
          title="Today's Collections"
          value={mockStats.collectionsToday}
          icon={<Truck size={24} />}
          change={`+${mockStats.collectionsChange}`}
          changeType="positive"
          iconColor="primary"
        />
        <StatCard
          title="Active Users"
          value={mockStats.activeUsers.toLocaleString()}
          icon={<Users size={24} />}
          change={`+${mockStats.usersChange}`}
          changeType="positive"
          iconColor="primary"
        />
        <StatCard
          title="Recycling Rate"
          value={`${mockStats.recyclingRate}%`}
          icon={<Recycle size={24} />}
          change={`+${mockStats.recyclingChange}%`}
          changeType="positive"
          iconColor="primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Zone Overview */}
          <div>
            <Card 
              title="Zone Overview" 
              subtitle="Current fill levels by zone"
              headerAction={
                <button className={styles.viewAllBtn}>View Map</button>
              }
            >
              <div className={styles.zoneList}>
                {mockZoneData.map((zone) => (
                  <div key={zone.zone} className={styles.zoneItem}>
                    <div className={styles.zoneHeader}>
                      <div className={styles.zoneInfo}>
                        <MapPin size={16} className={styles.zoneIcon} />
                        <span className={styles.zoneName}>{zone.zone}</span>
                        <Badge variant={getStatusColor(zone.status)} size="sm">
                          {zone.bins} bins
                        </Badge>
                      </div>
                      <span className={styles.zonePercentage}>{zone.fillLevel}%</span>
                    </div>
                    <ProgressBar 
                      value={zone.fillLevel} 
                      variant={zone.fillLevel > 80 ? 'error' : zone.fillLevel > 60 ? 'warning' : 'success'}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Waste Breakdown */}
          <div>
            <Card 
              title="Waste Composition" 
              subtitle="Breakdown by waste type"
            >
              <div className={styles.wasteBreakdown}>
                {mockWasteBreakdown.map((item) => (
                  <div key={item.type} className={styles.wasteItem}>
                    <div className={styles.wasteHeader}>
                      <div className={styles.wasteType}>
                        <span 
                          className={styles.wasteColor} 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.type}</span>
                      </div>
                      <span className={styles.wastePercentage}>{item.percentage}%</span>
                    </div>
                    <div className={styles.wasteBar}>
                      <div 
                        className={styles.wasteBarFill}
                        style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Alerts */}
          <div>
            <Card 
              title="Recent Alerts" 
              subtitle="System notifications"
              headerAction={
                <Badge variant="warning">{mockAlerts.length} Active</Badge>
              }
            >
              <div className={styles.alertList}>
                {mockAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`${styles.alertItem} ${styles[alert.type]}`}
                  >
                    <div className={styles.alertIcon}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className={styles.alertContent}>
                      <p className={styles.alertMessage}>{alert.message}</p>
                      <div className={styles.alertMeta}>
                        <span>{alert.location}</span>
                        <span className={styles.alertDot}>•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Collections */}
          <div>
            <Card 
              title="Recent Collections" 
              subtitle="Latest collection activities"
              headerAction={
                <button className={styles.viewAllBtn}>View All</button>
              }
            >
              <div className={styles.collectionList}>
                {mockRecentCollections.map((collection) => (
                  <div key={collection.id} className={styles.collectionItem}>
                    <div className={styles.collectionMain}>
                      <div className={styles.collectionId}>{collection.id}</div>
                      <div className={styles.collectionDetails}>
                        <span>{collection.route}</span>
                        <span className={styles.collectionDot}>•</span>
                        <span>{collection.vehicle}</span>
                        <span className={styles.collectionDot}>•</span>
                        <span>{collection.bins} bins</span>
                      </div>
                    </div>
                    <div className={styles.collectionMeta}>
                      <Badge variant={getStatusColor(collection.status)} size="sm">
                        {collection.status}
                      </Badge>
                      <span className={styles.collectionTime}>{collection.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className={styles.impactSection}>
        <Card variant="elevated" className={styles.impactCard}>
          <div className={styles.impactContent}>
            <div className={styles.impactIcon}>
              <Leaf size={32} />
            </div>
            <div className={styles.impactText}>
              <h3 className={styles.impactTitle}>Environmental Impact This Month</h3>
              <p className={styles.impactDescription}>
                Your waste management system has contributed to reducing carbon emissions
              </p>
            </div>
            <div className={styles.impactStats}>
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>2,450</span>
                <span className={styles.impactLabel}>kg CO₂ Saved</span>
              </div>
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>12,300</span>
                <span className={styles.impactLabel}>kg Recycled</span>
              </div>
              <div className={styles.impactStat}>
                <span className={styles.impactValue}>847</span>
                <span className={styles.impactLabel}>Trees Equivalent</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

