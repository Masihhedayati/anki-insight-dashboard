
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
  ReferenceLine
} from "recharts";

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

  return (
    <Card className="col-span-full">
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
            <div className={`text-xl font-medium ${isPositiveChange ? 'text-chart-success' : 'text-chart-danger'}`}>
              {isPositiveChange ? '+' : ''}{percentChange}%
            </div>
            <div className="text-sm text-muted-foreground">from previous day</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[250px]">
            <h3 className="text-sm font-medium mb-2">30-Day Trend</h3>
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
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).getDate().toString()}
                  tick={{ fontSize: 12 }}
                  tickCount={6}
                />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <Tooltip 
                  formatter={(value) => [`${value} cards`, 'Reviews']} 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorReviews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[250px]">
            <h3 className="text-sm font-medium mb-2">Last 7 Days</h3>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxis}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <Tooltip 
                  formatter={(value) => [`${value} cards`, 'Reviews']} 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <ReferenceLine y={averageWeekly} stroke="#ff7300" strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewActivity;
