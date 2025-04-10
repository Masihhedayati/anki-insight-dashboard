
import React from 'react';

interface ChartGradientProps {
  id: string;
  startColor: string;
  endColor: string;
}

export const ChartGradient: React.FC<ChartGradientProps> = ({ id, startColor, endColor }) => {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={startColor} stopOpacity={0.8} />
      <stop offset="95%" stopColor={endColor} stopOpacity={0.1} />
    </linearGradient>
  );
};

export default ChartGradient;
