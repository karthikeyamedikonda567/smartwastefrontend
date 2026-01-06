import clsx from 'clsx'
import styles from './Badge.module.css'

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[variant],
        styles[size],
        dot && styles.withDot,
        className
      )}
      {...props}
    >
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  )
}

export default Badge
