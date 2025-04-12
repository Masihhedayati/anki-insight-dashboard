
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { easeFactorData } from "../data/mockData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList,
  Cell
} from "recharts";
import ChartAnimation from "./ChartAnimation";
import { useChartSettings } from "@/context/ChartContext";
import CustomTooltip from "./CustomTooltip";

const CardPerformance = () => {
  const { animationsEnabled, chartTheme } = useChartSettings();
  
  // Sample leech cards data
  const leechCards = [
    { id: 1, front: "Krebs cycle intermediate that...", back: "Succinyl-CoA", lapses: 8 },
    { id: 2, front: "Hormone secreted by the pineal...", back: "Melatonin", lapses: 7 },
    { id: 3, front: "The protein that forms the...", back: "Collagen", lapses: 6 },
    { id: 4, front: "Enzyme that converts angiotensin...", back: "ACE", lapses: 5 },
  ];

  const barColor = chartTheme === 'dark' ? '#8b5cf6' : '#8b5cf6';

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle>Ease Factor Distribution</CardTitle>
          <CardDescription>
            Showing difficulty spread across all cards
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartAnimation delay={500} type="fadeIn">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={easeFactorData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <Tooltip 
                  content={<CustomTooltip 
                    theme={chartTheme}
                    valueFormatter={(value) => `${value} cards`} 
                    labelFormatter={(label) => `Ease Factor: ${label}`}
                  />} 
                  cursor={{
                    fill: chartTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    radius: [4, 4, 0, 0]
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill={barColor}
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={animationsEnabled}
                  animationDuration={1500}
                  animationBegin={200}
                  animationEasing="ease-out"
                >
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    style={{ fontSize: '11px', fill: chartTheme === 'dark' ? '#ccc' : '#666' }} 
                    className="transition-opacity"
                  />
                  {easeFactorData.map((entry, index) => {
                    // Calculate color based on ease factor - easier cards are blue, harder are purple
                    const difficultyIndex = easeFactorData.findIndex(item => item.range === entry.range);
                    const totalRanges = easeFactorData.length;
                    const difficultyRatio = difficultyIndex / (totalRanges - 1);
                    
                    // Generate a color between blue and purple based on difficulty
                    const color = difficultyRatio < 0.5 
                      ? `rgba(99, 102, 241, ${0.7 + difficultyRatio * 0.6})` // Blue shade
                      : `rgba(139, 92, 246, ${0.7 + (difficultyRatio - 0.5) * 0.6})`; // Purple shade
                    
                    return (
                      <Cell 
                        key={`cell-${index}`}
                        fill={color}
                        className="transition-all duration-300 hover:filter hover:brightness-110 hover:translate-y-[-2px]"
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartAnimation>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-destructive/5 to-transparent pointer-events-none" />
        <CardHeader>
          <CardTitle>Leech Cards</CardTitle>
          <CardDescription>
            Cards with high lapse counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAnimation delay={700} type="fadeIn">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-3 text-left font-medium">Front</th>
                    <th className="px-2 py-3 text-left font-medium">Back</th>
                    <th className="px-2 py-3 text-right font-medium">Lapses</th>
                  </tr>
                </thead>
                <tbody>
                  {leechCards.map((card, index) => (
                    <tr 
                      key={card.id} 
                      className="border-b border-gray-100 animate-fade-in hover:bg-muted/30 transition-colors cursor-pointer" 
                      style={{ animationDelay: `${500 + index * 150}ms` }}
                    >
                      <td className="px-2 py-3 text-left font-medium truncate max-w-[150px]">
                        {card.front}
                      </td>
                      <td className="px-2 py-3 text-left text-muted-foreground truncate max-w-[100px]">
                        {card.back}
                      </td>
                      <td className="px-2 py-3 text-right">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-medium hover:scale-110 hover:bg-red-200 transition-all" style={{ animationDelay: `${index * 200}ms` }}>
                          {card.lapses}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 animate-fade-in" style={{ animationDelay: '1000ms' }}>
              <h4 className="text-sm font-medium mb-3">Leech Analysis</h4>
              <p className="text-sm text-muted-foreground">
                These cards have been forgotten frequently. Consider:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
                <li className="animate-fade-in hover:text-foreground transition-colors" style={{ animationDelay: '1100ms' }}>Rewriting the card for clarity</li>
                <li className="animate-fade-in hover:text-foreground transition-colors" style={{ animationDelay: '1200ms' }}>Breaking complex cards into simpler ones</li>
                <li className="animate-fade-in hover:text-foreground transition-colors" style={{ animationDelay: '1300ms' }}>Adding more context or mnemonics</li>
              </ul>
            </div>
          </ChartAnimation>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPerformance;
