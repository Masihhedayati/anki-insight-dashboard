
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cardStatesData, responseTimeData } from "../data/mockData";
import { formatNumber } from "../utils/chartUtils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useChartSettings } from "@/context/ChartContext";
import CustomTooltip from "./CustomTooltip";
import ChartAnimation from "./ChartAnimation";

const StatsOverview = () => {
  const totalCards = cardStatesData.reduce((sum, item) => sum + item.value, 0);
  const { chartTheme, animationsEnabled } = useChartSettings();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle>Card Distribution</CardTitle>
          <CardDescription>
            Distribution across learning stages
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartAnimation delay={400}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cardStatesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  isAnimationActive={animationsEnabled}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={100}
                >
                  {cardStatesData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="animate-pulse" 
                      style={{ animationDelay: `${index * 150}ms`, animationDuration: '3s' }} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip 
                    theme={chartTheme}
                    labelFormatter={() => 'Card Distribution'} 
                    valueFormatter={(value, name) => `${value} cards (${((value / totalCards) * 100).toFixed(1)}%)`}
                  />} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartAnimation>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle>Card Metrics</CardTitle>
          <CardDescription>
            Total: {formatNumber(totalCards)} cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAnimation delay={600} type="fadeIn">
            <div className="space-y-4">
              {cardStatesData.map((item, index) => (
                <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.value} cards ({((item.value / totalCards) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <Progress 
                    value={(item.value / totalCards) * 100} 
                    className="h-2 transition-all duration-1000"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '--progress-background': item.color // custom CSS variable
                    } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Average Response Time</h4>
              <div className="space-y-3">
                {responseTimeData.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between animate-fade-in" 
                    style={{ animationDelay: `${(index + cardStatesData.length) * 100}ms` }}
                  >
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium">{item.time.toFixed(1)}s</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartAnimation>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
