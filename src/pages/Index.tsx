
import DashboardHeader from "@/components/DashboardHeader";
import ReviewActivity from "@/components/ReviewActivity";
import StatsOverview from "@/components/StatsOverview";
import CardPerformance from "@/components/CardPerformance";
import RetentionMetrics from "@/components/RetentionMetrics";
import FutureWorkload from "@/components/FutureWorkload";
import StudyPatterns from "@/components/StudyPatterns";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ChartSettings from "@/components/ChartSettings";
import { ChartProvider } from "@/context/ChartContext";

const Index = () => {
  return (
    <ChartProvider>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <DashboardHeader />
          <div className="flex items-center gap-2">
            <ChartSettings />
            <ThemeSwitcher />
          </div>
        </div>
        
        <div className="space-y-8 mt-8">
          <ReviewActivity />
          
          <StatsOverview />
          
          <CardPerformance />
          
          <RetentionMetrics />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <FutureWorkload />
            <StudyPatterns />
          </div>
        </div>
      </div>
    </ChartProvider>
  );
};

export default Index;
