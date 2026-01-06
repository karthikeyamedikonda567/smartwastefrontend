import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Trash2,
  Calendar,
  Truck,
  Recycle,
  Package,
  Receipt,
  Bell,
  MessageSquare,
  BarChart3,
  FileText,
  Leaf,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import styles from './Sidebar.module.css'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/bins', icon: Trash2, label: 'Bin Records' },
  { path: '/scheduling', icon: Calendar, label: 'Scheduling' },
  { path: '/collections', icon: Truck, label: 'Collections' },
  { path: '/waste', icon: Recycle, label: 'Waste Categories' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/billing', icon: Receipt, label: 'Billing' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/requests', icon: MessageSquare, label: 'Service Requests' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/recycling', icon: Leaf, label: 'Recycling' },
]

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const location = useLocation()
  
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Leaf size={28} />
        </div>
        {!collapsed && (
          <span className={styles.logoText}>
            EcoWaste
          </span>
        )}
        
        {/* Mobile close button */}
        <button className={styles.mobileClose} onClick={onMobileClose}>
          <X size={24} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={onMobileClose}
                >
                  <span className={styles.navIcon}>
                    <item.icon size={20} />
                  </span>
                  {!collapsed && (
                    <span className={styles.navLabel}>
                      {item.label}
                    </span>
                  )}
                  {isActive && (
                    <div className={styles.activeIndicator} />
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* Settings at bottom */}
      <div className={styles.bottomNav}>
        <NavLink
          to="/settings"
          className={`${styles.navLink} ${location.pathname === '/settings' ? styles.active : ''}`}
        >
          <span className={styles.navIcon}>
            <Settings size={20} />
          </span>
          {!collapsed && <span className={styles.navLabel}>Settings</span>}
        </NavLink>
      </div>
      
      {/* Collapse toggle */}
      <button className={styles.collapseBtn} onClick={onToggle}>
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  )
}

export default Sidebar
