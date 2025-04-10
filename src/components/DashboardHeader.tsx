
import { Calendar, Activity, Award } from "lucide-react";
import { streakData, dailySummary } from "../data/mockData";

const DashboardHeader = () => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Anki Insight Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize your learning progress and optimize your study habits
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{streakData.current} day streak</span>
          </div>
          <div className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Last reviewed: Today</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today</p>
              <h3 className="text-2xl font-bold">{dailySummary.today.reviews} Cards</h3>
              <p className="text-sm text-muted-foreground">
                {dailySummary.today.timeSpent} · {dailySummary.today.retention} retention
              </p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
              <h3 className="text-2xl font-bold">{dailySummary.week.averageReviews} Cards/day</h3>
              <p className="text-sm text-muted-foreground">
                {dailySummary.week.totalTime} · {dailySummary.week.averageRetention} retention
              </p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <h3 className="text-2xl font-bold">{dailySummary.month.totalReviews} Cards</h3>
              <p className="text-sm text-muted-foreground">
                {dailySummary.month.averageTime} · Trend: {dailySummary.month.retentionTrend}
              </p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
