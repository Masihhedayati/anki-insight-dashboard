
import React, { useState, useEffect } from 'react';
import { useChartSettings } from '@/context/ChartContext';

interface ChartAnimationProps {
  children: React.ReactNode;
  delay?: number;
  type?: 'fadeIn' | 'scaleIn' | 'shimmer' | 'dataReveal' | 'valuePulse';
  dataDirection?: 'left-to-right' | 'bottom-to-top' | 'center-out';
  importance?: 'low' | 'medium' | 'high';
}

const ChartAnimation = ({ 
  children, 
  delay = 0,
  type = 'fadeIn',
  dataDirection = 'left-to-right',
  importance = 'medium'
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

  // Get animation class
  const getAnimationClass = () => {
    let baseAnimation = '';
    switch(type) {
      case 'scaleIn':
        baseAnimation = 'animate-scale-in';
        break;
      case 'shimmer':
        baseAnimation = 'animate-shimmer before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';
        break;
      case 'dataReveal':
        baseAnimation = dataDirection === 'left-to-right' 
          ? 'origin-left' 
          : dataDirection === 'bottom-to-top'
            ? 'origin-bottom'
            : 'origin-center';
        baseAnimation += ' animate-data-reveal';
        break;
      case 'valuePulse':
        baseAnimation = 'animate-value-pulse';
        break;
      case 'fadeIn':
      default:
        baseAnimation = 'animate-fade-in';
        break;
    }

    // Add importance-based animation speed
    const importanceClass = importance === 'high' 
      ? 'animation-duration-500' 
      : importance === 'low'
        ? 'animation-duration-1500'
        : 'animation-duration-1000';

    return `${baseAnimation} ${importanceClass}`;
  };

  // Add data direction mask if needed
  const getDataMaskStyle = () => {
    if (type !== 'dataReveal') return {};
    
    const styles: React.CSSProperties = {
      animationDelay: `${delay}ms`,
    };
    
    if (dataDirection === 'left-to-right') {
      return { 
        ...styles,
        maskImage: 'linear-gradient(to right, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))'
      } as React.CSSProperties;
    } else if (dataDirection === 'bottom-to-top') {
      return { 
        ...styles,
        maskImage: 'linear-gradient(to top, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))'
      } as React.CSSProperties;
    } else if (dataDirection === 'center-out') {
      return {
        ...styles,
        maskImage: 'radial-gradient(circle, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))',
        WebkitMaskImage: 'radial-gradient(circle, black 0%, black var(--reveal-progress, 100%), transparent var(--reveal-progress, 100%))'
      } as React.CSSProperties;
    }
    return styles;
  };

  return (
    <div 
      className={`relative w-full h-full opacity-0 ${isVisible ? `opacity-100 ${getAnimationClass()}` : ''}`} 
      style={{ 
        animationDelay: `${delay}ms`,
        ...getDataMaskStyle()
      }}
    >
      {children}
    </div>
  );
};

export default ChartAnimation;
