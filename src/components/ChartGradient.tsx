
import React from 'react';

interface ChartGradientProps {
  id: string;
  startColor: string;
  endColor: string;
  startOpacity?: number;
  endOpacity?: number;
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}

export const ChartGradient: React.FC<ChartGradientProps> = ({
  id,
  startColor,
  endColor,
  startOpacity = 0.8,
  endOpacity = 0.1,
  direction = 'vertical'
}) => {
  // Set coordinates based on direction
  let x1 = "0", y1 = "0", x2 = "0", y2 = "0";
  
  switch (direction) {
    case 'horizontal':
      x1 = "0"; y1 = "0"; x2 = "1"; y2 = "0";
      break;
    case 'diagonal':
      x1 = "0"; y1 = "0"; x2 = "1"; y2 = "1";
      break;
    case 'vertical':
    default:
      x1 = "0"; y1 = "0"; x2 = "0"; y2 = "1";
      break;
  }

  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="5%" stopColor={startColor} stopOpacity={startOpacity} />
      <stop offset="95%" stopColor={endColor} stopOpacity={endOpacity} />
    </linearGradient>
  );
};

export default ChartGradient;
