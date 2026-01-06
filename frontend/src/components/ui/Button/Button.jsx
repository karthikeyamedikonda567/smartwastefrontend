import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  // Support both icon prop (with position) and leftIcon/rightIcon props
  const showLeftIcon = LeftIcon || (Icon && iconPosition === 'left');
  const showRightIcon = RightIcon || (Icon && iconPosition === 'right');
  const LeftIconComponent = LeftIcon || (iconPosition === 'left' ? Icon : null);
  const RightIconComponent = RightIcon || (iconPosition === 'right' ? Icon : null);

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {LeftIconComponent && !loading && <span className={styles.icon}>{LeftIconComponent}</span>}
      {children}
      {RightIconComponent && !loading && <span className={styles.icon}>{RightIconComponent}</span>}
    </button>
  );
};

export default Button;
