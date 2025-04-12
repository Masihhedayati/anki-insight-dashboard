
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dueForecastData } from "../data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";
import { Compass } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChartAnimation from "./ChartAnimation";
import { useChartSettings } from "@/context/ChartContext";
import CustomTooltip from "./CustomTooltip";

const FutureWorkload = () => {
  const isMobile = useIsMobile();
  const { animationsEnabled, chartTheme } = useChartSettings();
  
  // Calculate average daily due cards
  const averageDue = Math.round(
    dueForecastData.reduce((sum, item) => sum + item.count, 0) / dueForecastData.length
  );

  // Total due in next 7 days
  const totalDue = dueForecastData.reduce((sum, item) => sum + item.count, 0);

  // Modify data for mobile view if needed
  const chartData = isMobile 
    ? dueForecastData.map(item => ({
        ...item,
        date: item.date.substring(0, 3) // Only show first 3 chars of date on mobile
      }))
    : dueForecastData;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl">Future Workload</CardTitle>
        <CardDescription>
          Upcoming reviews forecast
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4">
          <div className="mb-2 sm:mb-0">
            <div className="text-xl sm:text-2xl font-bold">{totalDue}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Cards due in next 7 days</div>
          </div>
          <div>
            <div className="flex items-center">
              <Compass className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary animate-float" />
              <span className="text-xs sm:text-sm font-medium">~{averageDue} cards/day</span>
            </div>
          </div>
        </div>

        <div className="h-[200px] sm:h-[250px]">
          <ChartAnimation delay={500}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: isMobile ? 5 : 10,
                  left: isMobile ? -15 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: isMobile ? 10 : 12 }} 
                  tickMargin={isMobile ? 5 : 10}
                />
                <YAxis 
                  tick={{ fontSize: isMobile ? 10 : 12 }} 
                  width={isMobile ? 25 : 35} 
                  tickFormatter={value => isMobile && value > 999 ? `${(value/1000).toFixed(1)}k` : value}
                />
                <Tooltip 
                  content={<CustomTooltip 
                    theme={chartTheme}
                    valueFormatter={(value) => `${value} cards`}
                    labelFormatter={(value) => `${value}`}
                  />}
                  cursor={{
                    fill: chartTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    radius: [4, 4, 0, 0]
                  }}
                />
                <ReferenceLine y={averageDue} stroke={chartTheme === 'dark' ? "#888" : "#666"} strokeDasharray="3 3" />
                <Bar 
                  dataKey="count" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={animationsEnabled}
                  animationDuration={1200}
                  animationBegin={300}
                  animationEasing="ease-out"
                >
                  {dueForecastData.map((entry, index) => {
                    // Gradient color based on workload: green to red
                    let color = '#10b981'; // Default green
                    if (entry.count > averageDue * 1.5) {
                      color = '#ef4444'; // Red for heavy days
                    } else if (entry.count > averageDue * 1.2) {
                      color = '#f59e0b'; // Yellow for above average
                    }
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={color} 
                        className="transition-colors duration-300 hover:brightness-110" 
                        style={{ animationDelay: `${index * 150}ms` }}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartAnimation>
        </div>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
          <p className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <span className="font-medium">Today:</span> {dueForecastData[0].count} cards due
          </p>
          {!isMobile && (
            <p className="mt-1 animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <span className="font-medium">Tip:</span> Try to maintain a consistent review load by not adding too many new cards on heavy days.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureWorkload;
