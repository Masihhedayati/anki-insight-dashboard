
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { studyTimeData } from "../data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { formatTime } from "../utils/chartUtils";
import { Clock } from "lucide-react";

const StudyPatterns = () => {
  // Calculate total study time
  const totalMinutes = studyTimeData.reduce((total, item) => total + item.minutes, 0);
  
  // Format the total time
  const totalTime = formatTime(totalMinutes);
  
  // Find peak study time
  const peakHour = studyTimeData.reduce(
    (max, item) => (item.minutes > max.minutes ? item : max), 
    studyTimeData[0]
  );

  // Convert 24h hour to 12h format
  const format12Hour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Pattern Analysis</CardTitle>
        <CardDescription>
          Study time distribution by hour of day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <div className="text-2xl font-bold">{totalTime}</div>
            <div className="text-sm text-muted-foreground">Total study time</div>
          </div>
          <div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">Peak time: {format12Hour(peakHour.hour)}</span>
            </div>
          </div>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={studyTimeData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 11 }}
                tickFormatter={(hour) => {
                  if (hour % 3 === 0) return format12Hour(hour);
                  return '';
                }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                width={35}
                tickFormatter={(value) => `${value}m`}
              />
              <Tooltip 
                formatter={(value) => [`${value} minutes`, 'Study Time']} 
                labelFormatter={(hour) => `${format12Hour(hour)}`}
              />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {studyTimeData.map((entry, index) => {
                  // Morning: blue, afternoon: purple, evening: indigo, night: slate
                  let color;
                  if (entry.hour >= 5 && entry.hour < 12) {
                    color = '#0ea5e9'; // blue
                  } else if (entry.hour >= 12 && entry.hour < 17) {
                    color = '#8b5cf6'; // purple
                  } else if (entry.hour >= 17 && entry.hour < 22) {
                    color = '#6366f1'; // indigo
                  } else {
                    color = '#64748b'; // slate
                  }
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0ea5e9] mr-2"></div>
            <span className="text-muted-foreground">Morning (5AM-12PM)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-2"></div>
            <span className="text-muted-foreground">Afternoon (12PM-5PM)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6366f1] mr-2"></div>
            <span className="text-muted-foreground">Evening (5PM-10PM)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#64748b] mr-2"></div>
            <span className="text-muted-foreground">Night (10PM-5AM)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPatterns;
