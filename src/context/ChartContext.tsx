
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChartContextType {
  chartTheme: 'light' | 'dark';
  gridLines: boolean;
  animationsEnabled: boolean;
  smoothCurves: boolean;
  useGradients: boolean;
  setChartTheme: (theme: 'light' | 'dark') => void;
  setGridLines: (show: boolean) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setSmoothCurves: (smooth: boolean) => void;
  setUseGradients: (use: boolean) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: ReactNode }) {
  const [chartTheme, setChartTheme] = useState<'light' | 'dark'>('light');
  const [gridLines, setGridLines] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [smoothCurves, setSmoothCurves] = useState(true);
  const [useGradients, setUseGradients] = useState(true);
  
  // Update theme when system theme changes
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setChartTheme(isDarkMode ? 'dark' : 'light');
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          setChartTheme(isDarkMode ? 'dark' : 'light');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <ChartContext.Provider 
      value={{
        chartTheme,
        gridLines,
        animationsEnabled,
        smoothCurves,
        useGradients,
        setChartTheme,
        setGridLines,
        setAnimationsEnabled,
        setSmoothCurves,
        setUseGradients
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export function useChartSettings() {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChartSettings must be used within a ChartProvider');
  }
  return context;
}
