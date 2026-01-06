import styles from './StatCard.module.css';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  change, 
  changeType,
  iconColor,
  className = '' 
}) => {
  // Support both trend/trendValue and change/changeType props
  const displayTrend = trend || (changeType === 'positive' ? 'up' : changeType === 'negative' ? 'down' : null);
  const displayTrendValue = trendValue || change;
  const trendClass = displayTrend === 'up' ? styles.trendUp : displayTrend === 'down' ? styles.trendDown : '';

  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && (
          <div className={`${styles.iconWrapper} ${iconColor ? styles[iconColor] : ''}`}>
            {icon}
          </div>
        )}
      </div>
      <div className={styles.value}>{value}</div>
      {displayTrendValue && (
        <div className={`${styles.trend} ${trendClass}`}>
          {displayTrend === 'up' ? '↑' : displayTrend === 'down' ? '↓' : ''} {displayTrendValue}
        </div>
      )}
    </div>
  );
};

export default StatCard;
