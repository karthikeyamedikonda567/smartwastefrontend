import { Outlet } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import styles from './AuthLayout.module.css'

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Left side - Branding */}
      <div className={styles.brandingSide}>
        <div className={styles.brandingContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Leaf size={40} />
            </div>
            <span className={styles.logoText}>EcoWaste</span>
          </div>
          
          <h1 className={styles.tagline}>
            Smart Waste Management<br />
            <span>for a Cleaner Tomorrow</span>
          </h1>
          
          <p className={styles.description}>
            Optimize collection routes, track recycling progress, and build 
            sustainable communities with our intelligent waste management platform.
          </p>
          
          {/* Decorative stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>2.5M+</span>
              <span className={styles.statLabel}>Bins Managed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>98%</span>
              <span className={styles.statLabel}>Collection Rate</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>45%</span>
              <span className={styles.statLabel}>Recycling Rate</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className={styles.decorativeCircle1} />
        <div className={styles.decorativeCircle2} />
      </div>
      
      {/* Right side - Form */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
