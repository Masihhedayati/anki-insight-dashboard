
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  theme?: 'light' | 'dark';
  labelFormatter?: (label: any) => React.ReactNode;
  valueFormatter?: (value: any, name: string) => React.ReactNode;
  showLabel?: boolean;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  theme = 'light',
  labelFormatter,
  valueFormatter,
  showLabel = true,
  className = "",
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-700';

  // Format the label if formatter is provided
  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <div className={`${bgColor} ${textColor} p-3 border ${borderColor} rounded shadow-md backdrop-blur-sm transition-all duration-150 transform scale-100 hover:scale-102 ${className}`}>
      {showLabel && formattedLabel && (
        <p className="font-medium mb-1 border-b border-gray-200 dark:border-gray-700 pb-1">{formattedLabel}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full transition-transform duration-200 hover:scale-125" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="font-medium">
              {entry.name}:
            </span>
            <span>
              {valueFormatter 
                ? valueFormatter(entry.value, entry.name) 
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;
