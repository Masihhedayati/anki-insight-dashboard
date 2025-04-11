
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { retentionData } from "../data/mockData";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Dot
} from "recharts";
import { Info } from "lucide-react";
import { Tooltip as UITooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChartAnimation from "./ChartAnimation";
import { useChartSettings } from "@/context/ChartContext";

const RetentionMetrics = () => {
  const { animationsEnabled } = useChartSettings();

  // Calculate average retention rate
  const averageRetention = Math.round(
    retentionData.reduce((sum, item) => sum + item.retention, 0) / retentionData.length
  );

  // Forgetting curve points (sample data)
  const forgettingCurveData = [
    { day: 0, retention: 100 },
    { day: 1, retention: 70 },
    { day: 2, retention: 60 },
    { day: 5, retention: 46 },
    { day: 10, retention: 37 },
    { day: 15, retention: 32 },
    { day: 30, retention: 28 },
    { day: 60, retention: 24 },
  ];

  // Custom dot for the line charts with animation
  const renderAnimatedDot = (props: any) => {
    const { cx, cy, stroke, payload, index } = props;

    return (
      <Dot
        cx={cx}
        cy={cy}
        r={index === 0 ? 5 : 3}
        stroke={stroke}
        fill={stroke}
        className={`animate-pulse ${index === 0 ? 'animate-glow-pulse' : ''}`}
        style={{ animationDelay: `${index * 100}ms`, animationDuration: '3s' }}
      />
    );
  };

  return (
    <Card className="col-span-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Retention Metrics</CardTitle>
            <CardDescription>
              Tracking memory retention over time
            </CardDescription>
          </div>
          <div className="rounded-md bg-primary/10 px-3 py-1 text-sm animate-pulse">
            <span className="font-medium">{averageRetention}%</span> Average Retention
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[350px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Monthly Retention Rate</h3>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Info className="h-4 w-4 text-muted-foreground animate-float" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Percentage of cards successfully recalled during reviews each month.
                      Higher is better.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <ChartAnimation delay={300}>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart
                  data={retentionData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis 
                    domain={[60, 100]} 
                    tick={{ fontSize: 12 }} 
                    width={40}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Retention Rate']} 
                    animationDuration={300}
                  />
                  <ReferenceLine y={averageRetention} stroke="#ff7300" strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={renderAnimatedDot}
                    activeDot={{ r: 8, className: "animate-glow-pulse" }}
                    isAnimationActive={animationsEnabled}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={100}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartAnimation>
          </div>

          <div className="h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Forgetting Curve</h3>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Info className="h-4 w-4 text-muted-foreground animate-float" style={{ animationDelay: '200ms' }} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Shows how information is forgotten over time without review.
                      This highlights the importance of spaced repetition.
                    </p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <ChartAnimation delay={600}>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart
                  data={forgettingCurveData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Days Since Learning', 
                      position: 'insideBottom', 
                      offset: -10,
                      fontSize: 12
                    }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }} 
                    width={40}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Retention']} 
                    labelFormatter={(value) => `Day ${value}`}
                    animationDuration={300}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={renderAnimatedDot}
                    activeDot={{ r: 8, className: "animate-pulse" }}
                    isAnimationActive={animationsEnabled}
                    animationDuration={1500}
                    animationEasing="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    animationBegin={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartAnimation>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionMetrics;
