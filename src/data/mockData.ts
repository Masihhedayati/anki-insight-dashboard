
// Daily review counts for the last 30 days
export const reviewActivityData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // Generate a random number of reviews between 50 and 300
  const count = Math.floor(Math.random() * 250) + 50;
  
  return {
    date: date.toISOString().split('T')[0],
    count,
  };
});

// Card states distribution
export const cardStatesData = [
  { name: 'Learning', value: 320, color: '#f59e0b' },
  { name: 'Young', value: 580, color: '#8b5cf6' },
  { name: 'Mature', value: 1200, color: '#10b981' },
  { name: 'Suspended', value: 75, color: '#6b7280' },
];

// Retention rates over time
export const retentionData = Array.from({ length: 12 }, (_, i) => {
  const month = new Date();
  month.setMonth(month.getMonth() - (11 - i));
  
  // Generate a random retention rate between 70% and 95%
  const retention = Math.floor(Math.random() * 25) + 70;
  
  return {
    month: month.toLocaleString('default', { month: 'short' }),
    retention,
  };
});

// Future due forecast for the next 7 days
export const dueForecastData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  
  // Generate more cards due in the near future
  const count = Math.floor(Math.random() * 100) + 50 - (i * 5);
  
  return {
    date: date.toLocaleString('default', { weekday: 'short' }),
    count: Math.max(count, 10), // Ensure at least 10 cards
  };
});

// Study time by hour of day
export const studyTimeData = Array.from({ length: 24 }, (_, i) => {
  // More likely to study during certain hours
  let minutes = 0;
  
  if (i >= 6 && i <= 8) {
    // Morning study
    minutes = Math.floor(Math.random() * 40) + 10;
  } else if (i >= 12 && i <= 14) {
    // Lunch break study
    minutes = Math.floor(Math.random() * 30) + 5;
  } else if (i >= 19 && i <= 23) {
    // Evening study
    minutes = Math.floor(Math.random() * 60) + 20;
  } else {
    // Random times during the day
    minutes = Math.floor(Math.random() * 15);
  }
  
  return {
    hour: i,
    minutes,
  };
});

// Average response time per card category
export const responseTimeData = [
  { category: 'Learning', time: 10.2 },
  { category: 'Young', time: 7.5 },
  { category: 'Mature', time: 4.3 },
];

// Ease factor distribution
export const easeFactorData = [
  { range: '150-200', count: 120 },
  { range: '200-250', count: 450 },
  { range: '250-300', count: 780 },
  { range: '300-350', count: 230 },
  { range: '350+', count: 75 },
];

// Streak data
export const streakData = {
  current: 24,
  longest: 45,
  total: 120,
  averageCards: 127,
};

// Daily study summary
export const dailySummary = {
  today: {
    reviews: 143,
    timeSpent: '32 min',
    retention: '87%',
  },
  week: {
    averageReviews: 156,
    totalTime: '3.5 hours',
    averageRetention: '89%',
  },
  month: {
    totalReviews: 4320,
    averageTime: '28 min/day',
    retentionTrend: '+2.3%',
  },
};
