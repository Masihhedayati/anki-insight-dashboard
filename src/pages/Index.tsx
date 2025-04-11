
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
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <ChartProvider>
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <DashboardHeader />
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ChartSettings />
            <ThemeSwitcher />
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
          <ReviewActivity />
          
          <StatsOverview />
          
          <CardPerformance />
          
          <RetentionMetrics />
          
          <div className="grid gap-4 md:gap-6">
            {/* On mobile, stack the charts vertically */}
            {isMobile ? (
              <>
                <FutureWorkload />
                <StudyPatterns />
              </>
            ) : (
              // On tablets and larger, place them side by side
              <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                <FutureWorkload />
                <StudyPatterns />
              </div>
            )}
          </div>
        </div>
      </div>
    </ChartProvider>
  );
};

export default Index;
