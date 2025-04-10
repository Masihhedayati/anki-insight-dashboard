/**
 * Formats a number with a thousands separator
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

/**
 * Formats a percentage value
 */
export const formatPercent = (percent: number): string => {
  return `${percent}%`;
};

/**
 * Formats minutes into hours and minutes
 */
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Returns a color for a specific card type
 */
export const getCardTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'learning':
      return '#f59e0b'; // warning
    case 'young':
      return '#8b5cf6'; // secondary
    case 'mature':
      return '#10b981'; // success
    case 'suspended':
      return '#6b7280'; // gray
    case 'forgotten':
      return '#ef4444'; // danger
    default:
      return '#6366f1'; // primary
  }
};

/**
 * Calculate percentage change between two numbers
 */
export const percentChange = (current: number, previous: number): string => {
  if (previous === 0) return '+100%';
  
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

/**
 * A reusable function to get the last N items from an array
 */
export const getLastNItems = <T,>(array: T[], n: number): T[] => {
  return array.slice(-n);
};

// Remove JSX components from this utility file
// These will be implemented in their own components
