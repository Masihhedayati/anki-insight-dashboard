
import { Calendar, Activity, Award } from "lucide-react";
import { streakData, dailySummary } from "../data/mockData";

const DashboardHeader = () => {
  return (
    <header className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Anki Insight Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Visualize your learning progress and optimize your study habits
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <div className="flex items-center bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">{streakData.current} day streak</span>
          </div>
          <div className="bg-accent/20 text-accent-foreground px-2 sm:px-3 py-1 rounded-full flex items-center">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">Last reviewed: Today</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Today</p>
              <h3 className="text-xl sm:text-2xl font-bold">{dailySummary.today.reviews} Cards</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {dailySummary.today.timeSpent} · {dailySummary.today.retention} retention
              </p>
            </div>
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">This Week</p>
              <h3 className="text-xl sm:text-2xl font-bold">{dailySummary.week.averageReviews} Cards/day</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {dailySummary.week.totalTime} · {dailySummary.week.averageRetention} retention
              </p>
            </div>
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>

        <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">This Month</p>
              <h3 className="text-xl sm:text-2xl font-bold">{dailySummary.month.totalReviews} Cards</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {dailySummary.month.averageTime} · Trend: {dailySummary.month.retentionTrend}
              </p>
            </div>
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
