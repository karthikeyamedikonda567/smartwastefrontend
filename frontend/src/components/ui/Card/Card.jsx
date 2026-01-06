import styles from './Card.module.css';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  padding = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${padding ? styles.padding : ''} ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {headerAction && <div className={styles.headerAction}>{headerAction}</div>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
