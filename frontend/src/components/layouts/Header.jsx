import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react'
import { useAuthStore } from '../../context/authStore'
import styles from './Header.module.css'

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore()
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  
  return (
    <header className={styles.header}>
      {/* Mobile menu button */}
      <button className={styles.menuBtn} onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      
      {/* Search */}
      <div className={`${styles.searchWrapper} ${searchFocused ? styles.focused : ''}`}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search bins, collections, reports..."
          className={styles.searchInput}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className={styles.searchShortcut}>⌘K</kbd>
      </div>
      
      {/* Right side */}
      <div className={styles.rightSection}>
        {/* Notifications */}
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.notificationDot} />
        </button>
        
        {/* Profile dropdown */}
        <div className={styles.profileWrapper}>
          <button 
            className={styles.profileBtn}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className={styles.avatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.full_name} />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>
                {user?.full_name || user?.username || 'User'}
              </span>
              <span className={styles.profileRole}>
                {user?.role || 'Citizen'}
              </span>
            </div>
            <ChevronDown 
              size={16} 
              className={`${styles.chevron} ${profileOpen ? styles.open : ''}`}
            />
          </button>
          
          {profileOpen && (
            <div className={styles.dropdown}>
              <Link to="/profile" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={() => { logout(); setProfileOpen(false); }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
