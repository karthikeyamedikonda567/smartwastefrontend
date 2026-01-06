import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  containerClassName,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={clsx(styles.container, fullWidth && styles.fullWidth, containerClassName)}>
      {label && (
        <label className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(styles.inputWrapper, error && styles.hasError)}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          ref={ref}
          type={type}
          className={clsx(
            styles.input,
            leftIcon && styles.hasLeftIcon,
            rightIcon && styles.hasRightIcon,
            className
          )}
          {...props}
        />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
