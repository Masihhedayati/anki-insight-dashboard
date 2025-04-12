
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { groupDatesByMonthAndWeek, getHeatmapColor, formatDateForHeatmap } from '@/utils/heatmapUtils';
import { useChartSettings } from '@/context/ChartContext';
import ChartAnimation from './ChartAnimation';

// Sample data structure
interface ActivityData {
  date: Date;
  value: number;
  details?: {
    reviews?: number;
    newCards?: number;
    timeSpent?: number;
  };
}

interface ActivityHeatmapProps {
  title?: string;
  description?: string;
  data?: ActivityData[];
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'viridis';
  valueLabel?: string;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  cellSize?: number;
  cellGap?: number;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate sample data for the last 6 months
const generateSampleData = (): ActivityData[] => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  const result: ActivityData[] = [];
  const currentDate = new Date(sixMonthsAgo);
  
  while (currentDate <= today) {
    // Generate more activity on weekends and random spikes
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const randomSpike = Math.random() > 0.85;
    
    // Base value from 0-5, more on weekends
    let value = Math.floor(Math.random() * (isWeekend ? 8 : 5));
    
    // Add occasional spikes
    if (randomSpike) {
      value = Math.floor(Math.random() * 13) + 8;
    }
    
    // Add occasional zero days (no activity)
    if (Math.random() > 0.8 && !isWeekend && !randomSpike) {
      value = 0;
    }
    
    result.push({
      date: new Date(currentDate),
      value,
      details: {
        reviews: value * (Math.floor(Math.random() * 10) + 10),
        newCards: Math.floor(value / 2),
        timeSpent: value * (Math.floor(Math.random() * 5) + 2)
      }
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
};

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  title = "Study Activity Heatmap",
  description = "Your daily study patterns over time",
  data,
  colorScheme = 'blue',
  valueLabel = "cards studied",
  showMonthLabels = true,
  showWeekdayLabels = true,
  cellSize = 12,
  cellGap = 3,
}) => {
  const [selectedRange, setSelectedRange] = useState<'3m' | '6m' | '1y'>('6m');
  const { chartTheme } = useChartSettings();
  
  // Use sample data if not provided
  const activityData = useMemo(() => data || generateSampleData(), [data]);
  
  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    const today = new Date();
    let startDate = new Date();
    
    if (selectedRange === '3m') {
      startDate.setMonth(today.getMonth() - 3);
    } else if (selectedRange === '6m') {
      startDate.setMonth(today.getMonth() - 6);
    } else {
      startDate.setFullYear(today.getFullYear() - 1);
    }
    
    return activityData.filter(item => item.date >= startDate);
  }, [activityData, selectedRange]);
  
  // Find max value for color scaling
  const maxValue = useMemo(() => {
    return Math.max(...filteredData.map(item => item.value));
  }, [filteredData]);
  
  // Group dates by month and week
  const groupedDates = useMemo(() => {
    return groupDatesByMonthAndWeek(filteredData);
  }, [filteredData]);
  
  // Current streak calculation
  const streak = useMemo(() => {
    let currentStreak = 0;
    const sortedData = [...filteredData].sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    );
    
    for (let i = 0; i < sortedData.length; i++) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const currentDate = new Date(sortedData[i].date);
      currentDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);
      
      if (currentDate.getTime() === expectedDate.getTime() && sortedData[i].value > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  }, [filteredData]);
  
  // Calculate active days percentage
  const activeDaysPercent = useMemo(() => {
    const activeDays = filteredData.filter(item => item.value > 0).length;
    return Math.round((activeDays / filteredData.length) * 100);
  }, [filteredData]);
  
  // Calculate total cards studied
  const totalCardsStudied = useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.value, 0);
  }, [filteredData]);

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
        
        <Select defaultValue={selectedRange} onValueChange={(value) => setSelectedRange(value as '3m' | '6m' | '1y')}>
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">3 months</SelectItem>
            <SelectItem value="6m">6 months</SelectItem>
            <SelectItem value="1y">1 year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                {streak}
              </div>
              <div className="text-xs text-muted-foreground">Day streak</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{activeDaysPercent}%</div>
              <div className="text-xs text-muted-foreground">Active days</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCardsStudied}</div>
              <div className="text-xs text-muted-foreground">Total {valueLabel}</div>
            </div>
          </div>
          
          <div className="flex mt-3 sm:mt-0">
            <div className="flex items-center gap-1 text-xs">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-110"
                    style={{ 
                      backgroundColor: level === 0 
                        ? (chartTheme === 'dark' ? '#374151' : '#f3f4f6')
                        : getHeatmapColor(level * maxValue / 4, maxValue, colorScheme)
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
        
        <ChartAnimation type="fadeIn" delay={300}>
          <div className="relative overflow-x-auto pb-4">
            <div className="w-full min-w-max">
              {/* Weekday labels */}
              {showWeekdayLabels && (
                <div className="flex mb-2 relative left-10">
                  {weekdays.map((day, i) => (
                    <div 
                      key={day} 
                      className="text-xs text-muted-foreground"
                      style={{ 
                        width: cellSize, 
                        marginRight: cellGap,
                        textAlign: 'center',
                        visibility: i % 2 === 0 ? 'visible' : 'hidden' // Only show every other label on smaller screens
                      }}
                    >
                      {day.substring(0, 1)}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-4">
                {groupedDates.map((monthData) => (
                  <div key={monthData.month} className="mb-3">
                    {showMonthLabels && (
                      <div className="text-xs font-medium text-muted-foreground mb-1">{monthData.month}</div>
                    )}
                    
                    <div className="flex">
                      {monthData.weeks.map((week) => (
                        <div key={`${monthData.month}-${week.week}`} className="flex-col">
                          {week.days.map((day) => (
                            <TooltipProvider key={day.date.toISOString()}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className={`
                                      w-${cellSize} h-${cellSize} m-${cellGap/4} 
                                      rounded-sm cursor-pointer transition-all duration-150
                                      hover:scale-110 hover:brightness-110 hover:shadow-sm
                                      ${day.value > 0 ? 'border border-transparent' : 'border border-gray-200 dark:border-gray-700'}
                                    `}
                                    style={{ 
                                      width: cellSize, 
                                      height: cellSize,
                                      margin: cellGap / 2,
                                      backgroundColor: day.value > 0 
                                        ? getHeatmapColor(day.value, maxValue, colorScheme)
                                        : chartTheme === 'dark' ? '#374151' : '#f3f4f6',
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">
                                  <div className="font-medium">
                                    {formatDateForHeatmap(day.date, 'full')}
                                  </div>
                                  <div className="mt-1">
                                    {day.value === 0 ? (
                                      <span>No activity</span>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-1">
                                          <Activity className="w-3 h-3" />
                                          <span>{day.value} {valueLabel}</span>
                                        </div>
                                        
                                        {day.details && (
                                          <>
                                            {day.details.reviews !== undefined && (
                                              <div className="text-muted-foreground">
                                                {day.details.reviews} reviews completed
                                              </div>
                                            )}
                                            {day.details.timeSpent !== undefined && (
                                              <div className="text-muted-foreground">
                                                {day.details.timeSpent} min study time
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartAnimation>
        
        <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
          <div>
            <span className="font-medium">Tip:</span> Click on cells to see details
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            <span>Study consistency leads to better retention</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
