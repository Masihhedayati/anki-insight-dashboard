
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reviewActivityData } from "../data/mockData";
import { formatNumber, getLastNItems } from "../utils/chartUtils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  Customized,
  Cell
} from "recharts";
import { useChartSettings } from "@/context/ChartContext";
import ChartGradient from "./ChartGradient";
import CustomTooltip from "./CustomTooltip";
import ChartAnimation from "./ChartAnimation";

const ReviewActivity = () => {
  // Calculate some statistics
  const recentReviews = getLastNItems(reviewActivityData, 7);
  const lastDayReviews = reviewActivityData[reviewActivityData.length - 1].count;
  const previousDayReviews = reviewActivityData[reviewActivityData.length - 2].count;
  const percentChange = ((lastDayReviews - previousDayReviews) / previousDayReviews * 100).toFixed(1);
  const isPositiveChange = lastDayReviews >= previousDayReviews;

  // For bar chart - last 7 days
  const weeklyData = getLastNItems(reviewActivityData, 7);

  // Calculate average
  const averageWeekly = Math.round(
    weeklyData.reduce((sum, item) => sum + item.count, 0) / weeklyData.length
  );

  // Format X-axis date labels
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Get chart settings from context
  const { 
    chartTheme, 
    gridLines, 
    animationsEnabled, 
    smoothCurves,
    useGradients 
  } = useChartSettings();
  
  // Determine colors based on theme
  const areaColor = chartTheme === 'dark' ? '#a78bfa' : '#8884d8';
  const areaGradientStart = chartTheme === 'dark' ? '#a78bfa' : '#8884d8';
  const areaGradientEnd = chartTheme === 'dark' ? '#7c3aed' : '#6c63ff';
  const barColor = chartTheme === 'dark' ? '#818cf8' : '#6366f1';
  const gridColor = chartTheme === 'dark' ? '#374151' : '#eee';
  const referenceLineColor = chartTheme === 'dark' ? '#fb923c' : '#ff7300';

  return (
    <Card className="col-span-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardHeader>
        <CardTitle>Review Activity</CardTitle>
        <CardDescription>
          Cards reviewed over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div>
            <div className="text-3xl font-bold">{formatNumber(lastDayReviews)}</div>
            <div className="text-sm text-muted-foreground">Cards reviewed yesterday</div>
          </div>
          <div>
            <div className={`text-xl font-medium ${isPositiveChange ? 'text-chart-success animate-pulse' : 'text-chart-danger'}`}>
              {isPositiveChange ? '+' : ''}{percentChange}%
            </div>
            <div className="text-sm text-muted-foreground">from previous day</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[250px]">
            <h3 className="text-sm font-medium mb-2">30-Day Trend</h3>
            <ChartAnimation delay={300} type="fadeIn">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={reviewActivityData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    {useGradients && (
                      <ChartGradient 
                        id="colorReviews" 
                        startColor={areaGradientStart} 
                        endColor={areaGradientEnd} 
                        startOpacity={0.8} 
                        endOpacity={0.1} 
                      />
                    )}
                  </defs>
                  {gridLines && (
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke={gridColor} 
                    />
                  )}
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                    tick={{ fontSize: 12 }}
                    tickCount={6}
                    stroke={chartTheme === 'dark' ? '#9ca3af' : undefined}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={40} 
                    stroke={chartTheme === 'dark' ? '#9ca3af' : undefined}
                  />
                  <Tooltip 
                    content={
                      <CustomTooltip 
                        theme={chartTheme}
                        valueFormatter={(value) => `${value} cards`}
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      />
                    } 
                  />
                  <Area 
                    type={smoothCurves ? "monotone" : "linear"} 
                    dataKey="count" 
                    stroke={areaColor} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill={useGradients ? "url(#colorReviews)" : areaColor} 
                    isAnimationActive={animationsEnabled}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartAnimation>
          </div>

          <div className="h-[250px]">
            <h3 className="text-sm font-medium mb-2">Last 7 Days</h3>
            <ChartAnimation delay={600} type="scaleIn">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  {gridLines && (
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke={gridColor} 
                    />
                  )}
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatXAxis}
                    tick={{ fontSize: 12 }}
                    stroke={chartTheme === 'dark' ? '#9ca3af' : undefined}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={40} 
                    stroke={chartTheme === 'dark' ? '#9ca3af' : undefined}
                  />
                  <Tooltip 
                    content={
                      <CustomTooltip 
                        theme={chartTheme}
                        valueFormatter={(value) => `${value} cards`}
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      />
                    } 
                    animationDuration={300}
                    animationEasing="ease-out"
                  />
                  <ReferenceLine 
                    y={averageWeekly} 
                    stroke={referenceLineColor} 
                    strokeDasharray="3 3" 
                    label={{ 
                      value: `Avg: ${averageWeekly}`, 
                      position: 'right', 
                      fill: referenceLineColor,
                      fontSize: 12 
                    }} 
                  />
                  <Bar 
                    dataKey="count" 
                    fill={barColor} 
                    radius={[4, 4, 0, 0]} 
                    isAnimationActive={animationsEnabled}
                    animationDuration={1500}
                    animationBegin={300}
                    animationEasing="ease-out"
                  >
                    {weeklyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={barColor}
                        className="animate-glow-pulse"
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartAnimation>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewActivity;
