
import React, { useState, useEffect } from 'react';
import { useChartSettings } from '@/context/ChartContext';

interface ChartAnimationProps {
  children: React.ReactNode;
  delay?: number;
  type?: 'fadeIn' | 'scaleIn' | 'shimmer';
}

const ChartAnimation = ({ 
  children, 
  delay = 0,
  type = 'fadeIn'
}: ChartAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { animationsEnabled } = useChartSettings();
  
  useEffect(() => {
    if (!animationsEnabled) {
      setIsVisible(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, animationsEnabled]);

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  const getAnimationClass = () => {
    switch(type) {
      case 'scaleIn':
        return 'animate-scale-in';
      case 'shimmer':
        return 'animate-shimmer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';
      case 'fadeIn':
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div className={`relative w-full h-full opacity-0 ${isVisible ? `opacity-100 ${getAnimationClass()}` : ''}`} 
         style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default ChartAnimation;
