
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

const FutureWorkload = () => {
  // Calculate average daily due cards
  const averageDue = Math.round(
    dueForecastData.reduce((sum, item) => sum + item.count, 0) / dueForecastData.length
  );

  // Total due in next 7 days
  const totalDue = dueForecastData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Future Workload</CardTitle>
        <CardDescription>
          Upcoming reviews forecast
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <div className="text-2xl font-bold">{totalDue}</div>
            <div className="text-sm text-muted-foreground">Cards due in next 7 days</div>
          </div>
          <div>
            <div className="flex items-center">
              <Compass className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">~{averageDue} cards/day</span>
            </div>
          </div>
        </div>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dueForecastData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} width={35} />
              <Tooltip 
                formatter={(value) => [`${value} cards`, 'Due']} 
              />
              <ReferenceLine y={averageDue} stroke="#888" strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                {dueForecastData.map((entry, index) => {
                  // Gradient color based on workload: green to red
                  let color = '#10b981'; // Default green
                  if (entry.count > averageDue * 1.5) {
                    color = '#ef4444'; // Red for heavy days
                  } else if (entry.count > averageDue * 1.2) {
                    color = '#f59e0b'; // Yellow for above average
                  }
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium">Today:</span> {dueForecastData[0].count} cards due
          </p>
          <p className="mt-1">
            <span className="font-medium">Tip:</span> Try to maintain a consistent review load by not adding too many new cards on heavy days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureWorkload;
