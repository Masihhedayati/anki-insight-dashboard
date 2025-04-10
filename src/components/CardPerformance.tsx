
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
} from "recharts";

const CardPerformance = () => {
  // Sample leech cards data
  const leechCards = [
    { id: 1, front: "Krebs cycle intermediate that...", back: "Succinyl-CoA", lapses: 8 },
    { id: 2, front: "Hormone secreted by the pineal...", back: "Melatonin", lapses: 7 },
    { id: 3, front: "The protein that forms the...", back: "Collagen", lapses: 6 },
    { id: 4, front: "Enzyme that converts angiotensin...", back: "ACE", lapses: 5 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ease Factor Distribution</CardTitle>
          <CardDescription>
            Showing difficulty spread across all cards
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
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
                formatter={(value) => [`${value} cards`, 'Count']} 
              />
              <Bar 
                dataKey="count" 
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              >
                <LabelList dataKey="count" position="top" style={{ fontSize: '11px', fill: '#666' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leech Cards</CardTitle>
          <CardDescription>
            Cards with high lapse counts
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                {leechCards.map((card) => (
                  <tr key={card.id} className="border-b border-gray-100">
                    <td className="px-2 py-3 text-left font-medium truncate max-w-[150px]">
                      {card.front}
                    </td>
                    <td className="px-2 py-3 text-left text-muted-foreground truncate max-w-[100px]">
                      {card.back}
                    </td>
                    <td className="px-2 py-3 text-right">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                        {card.lapses}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-3">Leech Analysis</h4>
            <p className="text-sm text-muted-foreground">
              These cards have been forgotten frequently. Consider:
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
              <li>Rewriting the card for clarity</li>
              <li>Breaking complex cards into simpler ones</li>
              <li>Adding more context or mnemonics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPerformance;
