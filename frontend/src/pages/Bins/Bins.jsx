import { useState } from 'react';
import {
  Plus,
  Filter,
  Download,
  MapPin,
  Battery,
  Thermometer,
  Wifi,
  WifiOff,
  Settings,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { Card, Button, Badge, DataTable, Modal, Input, ProgressBar } from '../../components/ui';
import styles from './Bins.module.css';

// Mock data
const mockBins = [
  { 
    id: 'BIN-001', 
    location: '123 Main Street, Zone A', 
    type: 'General Waste', 
    fillLevel: 78, 
    status: 'active',
    lastCollection: '2024-01-15 09:30',
    battery: 85,
    temperature: 24,
    connectivity: 'online'
  },
  { 
    id: 'BIN-002', 
    location: '456 Oak Avenue, Zone B', 
    type: 'Recyclable', 
    fillLevel: 45, 
    status: 'active',
    lastCollection: '2024-01-15 10:15',
    battery: 92,
    temperature: 22,
    connectivity: 'online'
  },
  { 
    id: 'BIN-003', 
    location: '789 Pine Road, Zone C', 
    type: 'Organic', 
    fillLevel: 92, 
    status: 'needs-collection',
    lastCollection: '2024-01-14 14:00',
    battery: 67,
    temperature: 28,
    connectivity: 'online'
  },
  { 
    id: 'BIN-004', 
    location: '321 Elm Street, Zone A', 
    type: 'General Waste', 
    fillLevel: 15, 
    status: 'active',
    lastCollection: '2024-01-15 11:00',
    battery: 45,
    temperature: 23,
    connectivity: 'offline'
  },
  { 
    id: 'BIN-005', 
    location: '654 Birch Lane, Zone D', 
    type: 'Hazardous', 
    fillLevel: 62, 
    status: 'maintenance',
    lastCollection: '2024-01-13 08:45',
    battery: 78,
    temperature: 25,
    connectivity: 'online'
  },
  { 
    id: 'BIN-006', 
    location: '987 Cedar Court, Zone B', 
    type: 'E-Waste', 
    fillLevel: 33, 
    status: 'active',
    lastCollection: '2024-01-15 07:30',
    battery: 99,
    temperature: 21,
    connectivity: 'online'
  },
];

const binTypes = ['All Types', 'General Waste', 'Recyclable', 'Organic', 'Hazardous', 'E-Waste'];
const statusOptions = ['All Status', 'Active', 'Needs Collection', 'Maintenance', 'Offline'];

const Bins = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Status');

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': { variant: 'success', label: 'Active' },
      'needs-collection': { variant: 'warning', label: 'Needs Collection' },
      'maintenance': { variant: 'error', label: 'Maintenance' },
      'offline': { variant: 'default', label: 'Offline' },
    };
    const config = statusMap[status] || statusMap.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getFillLevelVariant = (level) => {
    if (level >= 80) return 'error';
    if (level >= 60) return 'warning';
    return 'success';
  };

  const columns = [
    {
      accessor: 'id',
      header: 'Bin ID',
      render: (value) => (
        <span className={styles.binId}>{value}</span>
      ),
    },
    {
      accessor: 'location',
      header: 'Location',
      render: (value) => (
        <div className={styles.location}>
          <MapPin size={14} className={styles.locationIcon} />
          <span>{value}</span>
        </div>
      ),
    },
    {
      accessor: 'type',
      header: 'Type',
      render: (value) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      accessor: 'fillLevel',
      header: 'Fill Level',
      render: (value) => (
        <div className={styles.fillLevel}>
          <ProgressBar value={value} variant={getFillLevelVariant(value)} size="small" />
          <span className={styles.fillPercentage}>{value}%</span>
        </div>
      ),
    },
    {
      accessor: 'connectivity',
      header: 'Status',
      render: (value, row) => (
        <div className={styles.statusCell}>
          {value === 'online' ? (
            <Wifi size={14} className={styles.onlineIcon} />
          ) : (
            <WifiOff size={14} className={styles.offlineIcon} />
          )}
          {getStatusBadge(row.status)}
        </div>
      ),
    },
    {
      accessor: 'battery',
      header: 'Battery',
      render: (value) => (
        <div className={styles.battery}>
          <Battery size={14} className={value < 30 ? styles.batteryLow : styles.batteryNormal} />
          <span>{value}%</span>
        </div>
      ),
    },
    {
      accessor: 'actions',
      header: '',
      sortable: false,
      render: (_, row) => (
        <div className={styles.actions}>
          <button className={styles.actionBtn} title="View Details">
            <Eye size={16} />
          </button>
          <button className={styles.actionBtn} title="Edit">
            <Edit size={16} />
          </button>
          <button className={styles.actionBtn} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Bin Management</h1>
          <p className={styles.subtitle}>Monitor and manage all waste bins in the system</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" leftIcon={<Download size={18} />}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
            Add Bin
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{mockBins.length}</span>
          <span className={styles.statLabel}>Total Bins</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={`${styles.statValue} ${styles.success}`}>
            {mockBins.filter(b => b.status === 'active').length}
          </span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={`${styles.statValue} ${styles.warning}`}>
            {mockBins.filter(b => b.status === 'needs-collection').length}
          </span>
          <span className={styles.statLabel}>Needs Collection</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={`${styles.statValue} ${styles.error}`}>
            {mockBins.filter(b => b.status === 'maintenance').length}
          </span>
          <span className={styles.statLabel}>Maintenance</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={`${styles.statValue} ${styles.muted}`}>
            {mockBins.filter(b => b.connectivity === 'offline').length}
          </span>
          <span className={styles.statLabel}>Offline</span>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Bin Type</label>
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {binTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <select
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <Button variant="ghost" leftIcon={<RefreshCw size={16} />} className={styles.refreshBtn}>
          Refresh Data
        </Button>
      </div>

      {/* Data Table */}
      <div>
        <Card>
          <DataTable
            columns={columns}
            data={mockBins}
            searchable
            searchPlaceholder="Search bins by ID or location..."
            pagination
            pageSize={10}
            hoverable
            onRowClick={(row) => setSelectedBin(row)}
          />
        </Card>
      </div>

      {/* Add Bin Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Bin"
        size="medium"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Add Bin
            </Button>
          </>
        }
      >
        <div className={styles.modalForm}>
          <Input label="Bin ID" placeholder="e.g., BIN-007" required />
          <Input label="Location" placeholder="Full address" required />
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Bin Type</label>
              <select className={styles.formSelect}>
                <option value="">Select type</option>
                {binTypes.slice(1).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Zone</label>
              <select className={styles.formSelect}>
                <option value="">Select zone</option>
                <option value="A">Zone A</option>
                <option value="B">Zone B</option>
                <option value="C">Zone C</option>
                <option value="D">Zone D</option>
              </select>
            </div>
          </div>
          <Input label="Capacity (liters)" type="number" placeholder="e.g., 240" />
          <Input label="Notes" placeholder="Additional information..." />
        </div>
      </Modal>
    </div>
  );
};

export default Bins;
