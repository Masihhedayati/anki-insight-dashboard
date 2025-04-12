
/**
 * Utilities for the heatmap component
 */

/**
 * Generate a color on a gradient scale based on value and max value
 * @param value The current value
 * @param maxValue The maximum possible value
 * @param colorScheme The color scheme to use
 * @returns A CSS color string
 */
export const getHeatmapColor = (
  value: number,
  maxValue: number,
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'viridis' = 'blue'
): string => {
  // Safety check
  if (maxValue === 0) return '#f3f4f6'; // Default gray for no data
  
  // Normalize value between 0 and 1
  const normalized = Math.max(0, Math.min(1, value / maxValue));
  
  // Different color schemes
  switch (colorScheme) {
    case 'green':
      // Green gradient (light to dark)
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.2) return '#d1fae5';
      if (normalized < 0.4) return '#a7f3d0';
      if (normalized < 0.6) return '#6ee7b7';
      if (normalized < 0.8) return '#34d399';
      return '#10b981';
      
    case 'blue':
      // Blue gradient (light to dark)
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.2) return '#dbeafe';
      if (normalized < 0.4) return '#bfdbfe';
      if (normalized < 0.6) return '#93c5fd';
      if (normalized < 0.8) return '#60a5fa';
      return '#3b82f6';
      
    case 'purple':
      // Purple gradient (light to dark)
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.2) return '#e9d5ff';
      if (normalized < 0.4) return '#d8b4fe';
      if (normalized < 0.6) return '#c084fc';
      if (normalized < 0.8) return '#a855f7';
      return '#8b5cf6';
      
    case 'orange':
      // Orange gradient (light to dark)
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.2) return '#ffedd5';
      if (normalized < 0.4) return '#fed7aa';
      if (normalized < 0.6) return '#fdba74';
      if (normalized < 0.8) return '#fb923c';
      return '#f97316';
      
    case 'red':
      // Red gradient (light to dark)
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.2) return '#fee2e2';
      if (normalized < 0.4) return '#fecaca';
      if (normalized < 0.6) return '#fca5a5';
      if (normalized < 0.8) return '#f87171';
      return '#ef4444';
      
    case 'viridis':
      // Scientific "viridis" colormap from dark blue to yellow
      if (normalized === 0) return '#f3f4f6';
      if (normalized < 0.125) return '#440154';
      if (normalized < 0.25) return '#404387';
      if (normalized < 0.375) return '#29788e';
      if (normalized < 0.5) return '#22a884';
      if (normalized < 0.625) return '#7ad151';
      if (normalized < 0.75) return '#fde725';
      if (normalized < 0.875) return '#fde725';
      return '#fde725';
      
    default:
      return '#3b82f6'; // Default blue
  }
};

/**
 * Format date into different formats
 */
export const formatDateForHeatmap = (date: Date, format: 'day' | 'month' | 'full' | 'short'): string => {
  switch (format) {
    case 'day':
      return date.getDate().toString();
    case 'month':
      return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    case 'full':
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    case 'short':
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Generate dates for a date range
 * @param startDate Start date
 * @param endDate End date
 * @returns Array of dates
 */
export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

/**
 * Group dates by month and week number
 * @param dates Array of dates
 * @returns Grouped dates by month and week
 */
export const groupDatesByMonthAndWeek = (
  dates: Array<{ date: Date; value: number }>
): { month: string; weeks: Array<{ week: number; days: Array<{ date: Date; value: number }> }> }[] => {
  const monthsMap = new Map<string, Map<number, Array<{ date: Date; value: number }>>>();
  
  // Group by month and week
  dates.forEach((dateItem) => {
    const date = dateItem.date;
    const month = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    
    // Get week number (0-indexed from start of month)
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysSinceFirstDay = Math.floor((date.getTime() - firstDayOfMonth.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.floor(daysSinceFirstDay / 7);
    
    if (!monthsMap.has(month)) {
      monthsMap.set(month, new Map());
    }
    
    const weeksMap = monthsMap.get(month)!;
    if (!weeksMap.has(weekNumber)) {
      weeksMap.set(weekNumber, []);
    }
    
    weeksMap.get(weekNumber)!.push(dateItem);
  });
  
  // Convert map to array structure
  const result = Array.from(monthsMap.entries()).map(([month, weeksMap]) => {
    const weeks = Array.from(weeksMap.entries())
      .map(([week, days]) => ({
        week,
        days: days.sort((a, b) => a.date.getTime() - b.date.getTime()),
      }))
      .sort((a, b) => a.week - b.week);
    
    return { month, weeks };
  });
  
  return result.sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');
    
    if (aYear !== bYear) {
      return parseInt(aYear) - parseInt(bYear);
    }
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(aMonth) - months.indexOf(bMonth);
  });
};
