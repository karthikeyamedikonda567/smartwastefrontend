import clsx from 'clsx'
import styles from './ProgressBar.module.css'

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  animated = true,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  // Determine color based on fill level (for bins)
  const getAutoVariant = () => {
    if (percentage >= 80) return 'error'
    if (percentage >= 60) return 'warning'
    return 'success'
  }
  
  const activeVariant = variant === 'auto' ? getAutoVariant() : variant
  
  return (
    <div className={clsx(styles.container, className)}>
      {(showLabel || label) && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label || 'Progress'}</span>
          <span className={styles.value}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={clsx(styles.track, styles[size])}>
        <div
          className={clsx(
            styles.bar,
            styles[activeVariant],
            animated && styles.animated
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
