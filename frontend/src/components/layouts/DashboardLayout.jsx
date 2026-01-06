import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styles from './DashboardLayout.module.css'

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <div className={styles.layout}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      
      <div className={`${styles.main} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
        <Header 
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        
        <main className={styles.content}>
          <div className={styles.pageWrapper}>
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout
