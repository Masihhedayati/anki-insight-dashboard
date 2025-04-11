
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveChartContainerProps {
  children: React.ReactNode;
  height?: string | number;
  mobileHeight?: string | number;
  className?: string;
}

const ResponsiveChartContainer: React.FC<ResponsiveChartContainerProps> = ({ 
  children, 
  height = '300px', 
  mobileHeight = '200px',
  className = '' 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`w-full overflow-hidden ${className}`}
      style={{ 
        height: isMobile ? mobileHeight : height,
        maxHeight: isMobile ? mobileHeight : height
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveChartContainer;
