
import { Calendar, Activity, Award, Sparkles } from "lucide-react";
import { streakData, dailySummary } from "../data/mockData";
import { Badge } from "./ui/badge";

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
        <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0 self-end md:self-auto ml-auto">
          {/* Enhanced Streak Badge */}
          <div className="relative group animate-fade-in">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent opacity-75 rounded-full blur-sm group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
            <div className="flex items-center bg-background/70 backdrop-blur-sm border border-primary/30 text-primary px-3 py-1.5 rounded-full relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse opacity-50"></div>
              <Award className="h-4 w-4 sm:h-4 sm:w-4 mr-1.5 text-chart-primary animate-[pulse_2s_ease-in-out_infinite]" />
              <span className="text-xs sm:text-sm font-medium flex items-center gap-1">
                <span className="font-bold text-sm sm:text-base">{streakData.current}</span> day streak
                <Sparkles className="h-3 w-3 text-chart-warning animate-[scale-in_1s_ease-out_infinite_alternate]" />
              </span>
            </div>
          </div>

          {/* Enhanced Last Reviewed Badge */}
          <div className="relative group animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-chart-info opacity-75 rounded-full blur-sm group-hover:opacity-100 transition-all duration-500 group-hover:blur-md"></div>
            <div className="flex items-center bg-background/70 backdrop-blur-sm border border-accent/30 px-3 py-1.5 rounded-full relative">
              <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse opacity-50"></div>
              <Calendar className="h-4 w-4 sm:h-4 sm:w-4 mr-1.5 text-chart-secondary animate-[pulse_2.5s_ease-in-out_infinite]" />
              <span className="text-xs sm:text-sm font-medium">Last reviewed: Today</span>
            </div>
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
