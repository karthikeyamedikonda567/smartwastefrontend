import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  Recycle,
  Trash2,
  Truck,
  Users,
} from 'lucide-react';
import { Card, Button, Badge, StatCard } from '../../components/ui';
import styles from './Analytics.module.css';

// Mock analytics data
const mockTrendData = [
  { month: 'Jan', waste: 1200, recycled: 340 },
  { month: 'Feb', waste: 1100, recycled: 380 },
  { month: 'Mar', waste: 1300, recycled: 420 },
  { month: 'Apr', waste: 1150, recycled: 460 },
  { month: 'May', waste: 1250, recycled: 510 },
  { month: 'Jun', waste: 1180, recycled: 550 },
];

const mockZonePerformance = [
  { zone: 'Zone A', efficiency: 92, collections: 234, complaints: 3 },
  { zone: 'Zone B', efficiency: 87, collections: 189, complaints: 7 },
  { zone: 'Zone C', efficiency: 94, collections: 267, complaints: 2 },
  { zone: 'Zone D', efficiency: 78, collections: 156, complaints: 12 },
  { zone: 'Zone E', efficiency: 85, collections: 198, complaints: 5 },
];

const mockWasteByType = [
  { type: 'Organic', value: 35, color: '#40916C' },
  { type: 'Recyclable', value: 28, color: '#2D6A4F' },
  { type: 'General', value: 25, color: '#6B7280' },
  { type: 'Hazardous', value: 8, color: '#C2410C' },
  { type: 'E-Waste', value: 4, color: '#7C3AED' },
];

const mockKeyMetrics = [
  { 
    title: 'Total Waste Collected',
    value: '12,450 kg',
    change: 8.2,
    positive: true,
    icon: <Trash2 size={20} />,
  },
  { 
    title: 'Recycling Rate',
    value: '67.5%',
    change: 4.7,
    positive: true,
    icon: <Recycle size={20} />,
  },
  { 
    title: 'Collection Efficiency',
    value: '94.2%',
    change: 2.1,
    positive: true,
    icon: <Truck size={20} />,
  },
  { 
    title: 'Citizen Satisfaction',
    value: '4.6/5',
    change: 0.3,
    positive: true,
    icon: <Users size={20} />,
  },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const maxWaste = Math.max(...mockTrendData.map(d => d.waste));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>Monitor waste management performance and trends</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.timeToggle}>
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                className={`${styles.timeBtn} ${timeRange === range ? styles.active : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="outline" leftIcon={<Download size={18} />}>
            Export Report
          </Button>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {mockKeyMetrics.map((metric) => (
          <div key={metric.title} className={styles.metricCard}>
            <div className={styles.metricIcon}>
              {metric.icon}
            </div>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricTitle}>{metric.title}</span>
            </div>
            <div className={`${styles.metricChange} ${metric.positive ? styles.positive : styles.negative}`}>
              {metric.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{metric.change}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartLarge}>
          <Card 
            title="Waste Collection Trends" 
            subtitle="Monthly waste and recycling volumes"
            headerAction={
              <div className={styles.chartLegend}>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-primary)' }} />
                  Total Waste
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-success)' }} />
                  Recycled
                </span>
              </div>
            }
          >
            <div className={styles.barChart}>
              {mockTrendData.map((data) => (
                <div key={data.month} className={styles.barGroup}>
                  <div className={styles.bars}>
                    <div
                      className={styles.bar}
                      style={{ 
                        backgroundColor: 'var(--color-primary-light)',
                        height: `${(data.waste / maxWaste) * 100}%`
                      }}
                    >
                      <div
                        className={styles.barFill}
                        style={{ 
                          backgroundColor: 'var(--color-success)',
                          height: `${(data.recycled / data.waste) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className={styles.barLabel}>{data.month}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Waste Composition" subtitle="Breakdown by waste type">
            <div className={styles.compositionChart}>
              <div className={styles.donutChart}>
                <svg viewBox="0 0 100 100" className={styles.donutSvg}>
                  {mockWasteByType.reduce((acc, item, index) => {
                    const startAngle = acc.offset;
                    const angle = (item.value / 100) * 360;
                    const endAngle = startAngle + angle;
                    
                    const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    acc.paths.push(
                      <path
                        key={item.type}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        className={styles.donutSegment}
                      />
                    );
                    
                    acc.offset = endAngle;
                    return acc;
                  }, { paths: [], offset: 0 }).paths}
                  <circle cx="50" cy="50" r="25" fill="var(--color-surface)" />
                </svg>
                <div className={styles.donutCenter}>
                  <span className={styles.donutTotal}>100%</span>
                  <span className={styles.donutLabel}>Total</span>
                </div>
              </div>
              <div className={styles.compositionLegend}>
                {mockWasteByType.map((item) => (
                  <div key={item.type} className={styles.legendRow}>
                    <span className={styles.legendColor} style={{ backgroundColor: item.color }} />
                    <span className={styles.legendType}>{item.type}</span>
                    <span className={styles.legendValue}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <Card 
          title="Zone Performance" 
          subtitle="Efficiency metrics by collection zone"
          headerAction={
            <Button variant="ghost" size="small">View Details</Button>
          }
        >
          <div className={styles.zoneTable}>
            <div className={styles.tableHeader}>
              <span>Zone</span>
              <span>Efficiency</span>
              <span>Collections</span>
              <span>Complaints</span>
              <span>Status</span>
            </div>
            {mockZonePerformance.map((zone) => (
              <div key={zone.zone} className={styles.tableRow}>
                <span className={styles.zoneName}>{zone.zone}</span>
                <span className={styles.zoneEfficiency}>
                  <div className={styles.efficiencyBar}>
                    <div
                      className={styles.efficiencyFill}
                      style={{
                        width: `${zone.efficiency}%`,
                        backgroundColor: 
                          zone.efficiency >= 90 ? 'var(--color-success)' :
                          zone.efficiency >= 80 ? 'var(--color-warning)' :
                          'var(--color-error)'
                      }}
                    />
                  </div>
                  <span>{zone.efficiency}%</span>
                </span>
                <span className={styles.zoneValue}>{zone.collections}</span>
                <span className={styles.zoneValue}>{zone.complaints}</span>
                <span>
                  <Badge 
                    variant={
                      zone.efficiency >= 90 ? 'success' :
                      zone.efficiency >= 80 ? 'warning' :
                      'error'
                    }
                    size="small"
                  >
                    {zone.efficiency >= 90 ? 'Excellent' :
                     zone.efficiency >= 80 ? 'Good' :
                     'Needs Improvement'}
                  </Badge>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Card variant="elevated" className={styles.insightsCard}>
          <div className={styles.insightsContent}>
            <div className={styles.insightsHeader}>
              <LineChart size={24} className={styles.insightsIcon} />
              <div>
                <h3 className={styles.insightsTitle}>AI-Powered Insights</h3>
                <p className={styles.insightsSubtitle}>Based on current trends and historical data</p>
              </div>
            </div>
            <div className={styles.insightsList}>
              <div className={styles.insightItem}>
                <ArrowUpRight size={16} className={styles.insightIconPositive} />
                <p>Recycling rates have improved by <strong>12%</strong> over the past quarter</p>
              </div>
              <div className={styles.insightItem}>
                <ArrowUpRight size={16} className={styles.insightIconPositive} />
                <p>Zone C maintains the highest collection efficiency at <strong>94%</strong></p>
              </div>
              <div className={styles.insightItem}>
                <TrendingUp size={16} className={styles.insightIconPositive} />
                <p>Predicted waste reduction of <strong>8%</strong> for next month based on current patterns</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
