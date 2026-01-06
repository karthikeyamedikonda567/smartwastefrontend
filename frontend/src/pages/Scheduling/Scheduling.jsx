import { useState } from 'react';
import {
  Plus,
  Calendar,
  Clock,
  Truck,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, Button, Badge, Modal, Input } from '../../components/ui';
import styles from './Scheduling.module.css';

// Mock data for collections schedule
const mockSchedule = [
  {
    id: 'SCH-001',
    route: 'Route 5 - Downtown',
    vehicle: 'CV-03',
    driver: 'John Smith',
    startTime: '06:00',
    endTime: '12:00',
    status: 'completed',
    binsCollected: 45,
    totalBins: 45,
    zones: ['Zone A', 'Zone B'],
  },
  {
    id: 'SCH-002',
    route: 'Route 12 - Industrial',
    vehicle: 'CV-07',
    driver: 'Maria Garcia',
    startTime: '07:00',
    endTime: '14:00',
    status: 'in-progress',
    binsCollected: 28,
    totalBins: 52,
    zones: ['Zone C'],
  },
  {
    id: 'SCH-003',
    route: 'Route 8 - Residential North',
    vehicle: 'CV-01',
    driver: 'David Chen',
    startTime: '08:00',
    endTime: '15:00',
    status: 'scheduled',
    binsCollected: 0,
    totalBins: 67,
    zones: ['Zone D', 'Zone E'],
  },
  {
    id: 'SCH-004',
    route: 'Route 3 - Commercial',
    vehicle: 'CV-09',
    driver: 'Sarah Wilson',
    startTime: '09:00',
    endTime: '16:00',
    status: 'delayed',
    binsCollected: 12,
    totalBins: 38,
    zones: ['Zone A'],
  },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Scheduling = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day');

  const getStatusConfig = (status) => {
    const configs = {
      completed: { variant: 'success', icon: <CheckCircle size={14} />, label: 'Completed' },
      'in-progress': { variant: 'primary', icon: <Play size={14} />, label: 'In Progress' },
      scheduled: { variant: 'default', icon: <Clock size={14} />, label: 'Scheduled' },
      delayed: { variant: 'warning', icon: <AlertCircle size={14} />, label: 'Delayed' },
      cancelled: { variant: 'error', icon: <Pause size={14} />, label: 'Cancelled' },
    };
    return configs[status] || configs.scheduled;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Collection Scheduling</h1>
          <p className={styles.subtitle}>Manage and monitor waste collection schedules</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
            New Schedule
          </Button>
        </div>
      </div>

      <div className={styles.calendarNav}>
        <div className={styles.dateNav}>
          <button className={styles.navBtn} onClick={() => navigateDate(-1)}>
            <ChevronLeft size={20} />
          </button>
          <div className={styles.dateDisplay}>
            <Calendar size={18} />
            <span>{formatDate(selectedDate)}</span>
          </div>
          <button className={styles.navBtn} onClick={() => navigateDate(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className={styles.viewToggle}>
          {['day', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              className={`${styles.viewBtn} ${viewMode === mode ? styles.active : ''}`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        <Button variant="ghost" leftIcon={<Filter size={16} />}>
          Filter
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-primary-light)' }}>
            <Truck size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>12</span>
            <span className={styles.statLabel}>Total Routes</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-success-light)' }}>
            <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>7</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-info-light)' }}>
            <Play size={20} style={{ color: 'var(--color-info)' }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statLabel}>In Progress</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'var(--color-warning-light)' }}>
            <AlertCircle size={20} style={{ color: 'var(--color-warning)' }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Delayed</span>
          </div>
        </div>
      </div>

      <div>
        <Card title="Today's Schedule" subtitle="All scheduled collections for the selected date">
          <div className={styles.scheduleList}>
            {mockSchedule.map((schedule) => {
              const statusConfig = getStatusConfig(schedule.status);
              const progress = (schedule.binsCollected / schedule.totalBins) * 100;
              
              return (
                <div key={schedule.id} className={styles.scheduleCard}>
                  <div className={styles.scheduleTime}>
                    <span className={styles.timeStart}>{schedule.startTime}</span>
                    <div className={styles.timeLine} />
                    <span className={styles.timeEnd}>{schedule.endTime}</span>
                  </div>
                  
                  <div className={styles.scheduleContent}>
                    <div className={styles.scheduleHeader}>
                      <h3 className={styles.routeName}>{schedule.route}</h3>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </Badge>
                    </div>
                    
                    <div className={styles.scheduleDetails}>
                      <div className={styles.detailItem}>
                        <Truck size={14} />
                        <span>{schedule.vehicle}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Users size={14} />
                        <span>{schedule.driver}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <MapPin size={14} />
                        <span>{schedule.zones.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className={styles.scheduleProgress}>
                      <div className={styles.progressHeader}>
                        <span>Collection Progress</span>
                        <span className={styles.progressText}>
                          {schedule.binsCollected}/{schedule.totalBins} bins
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${progress}%`,
                            backgroundColor: 
                              schedule.status === 'completed' ? 'var(--color-success)' :
                              schedule.status === 'delayed' ? 'var(--color-warning)' :
                              'var(--color-primary)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button className={styles.moreBtn}>
                    <MoreVertical size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Schedule"
        size="medium"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Create Schedule
            </Button>
          </>
        }
      >
        <div className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Route</label>
            <select className={styles.formSelect}>
              <option value="">Select a route</option>
              <option value="1">Route 5 - Downtown</option>
              <option value="2">Route 12 - Industrial</option>
              <option value="3">Route 8 - Residential North</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>
          <div className={styles.formRow}>
            <Input label="Start Time" type="time" />
            <Input label="End Time" type="time" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Assign Vehicle</label>
            <select className={styles.formSelect}>
              <option value="">Select a vehicle</option>
              <option value="CV-01">CV-01</option>
              <option value="CV-03">CV-03</option>
              <option value="CV-07">CV-07</option>
              <option value="CV-09">CV-09</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Assign Driver</label>
            <select className={styles.formSelect}>
              <option value="">Select a driver</option>
              <option value="1">John Smith</option>
              <option value="2">Maria Garcia</option>
              <option value="3">David Chen</option>
            </select>
          </div>
          <Input label="Notes" placeholder="Additional instructions..." />
        </div>
      </Modal>
    </div>
  );
};

export default Scheduling;
