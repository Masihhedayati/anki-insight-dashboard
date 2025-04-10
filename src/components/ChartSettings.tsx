
import React from 'react';
import { Settings, Grid, Wand2, LineChart, Palette } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useChartSettings } from '@/context/ChartContext';

const ChartSettings = () => {
  const {
    gridLines,
    animationsEnabled,
    smoothCurves,
    useGradients,
    setGridLines,
    setAnimationsEnabled,
    setSmoothCurves,
    setUseGradients
  } = useChartSettings();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          <span>Chart Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Chart Customization</h4>
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Grid className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="grid-lines">Show grid lines</Label>
              </div>
              <Switch 
                id="grid-lines" 
                checked={gridLines} 
                onCheckedChange={setGridLines} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wand2 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="animations">Enable animations</Label>
              </div>
              <Switch 
                id="animations" 
                checked={animationsEnabled} 
                onCheckedChange={setAnimationsEnabled} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LineChart className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="smooth-curves">Smooth curves</Label>
              </div>
              <Switch 
                id="smooth-curves" 
                checked={smoothCurves} 
                onCheckedChange={setSmoothCurves} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="gradients">Use gradients</Label>
              </div>
              <Switch 
                id="gradients" 
                checked={useGradients} 
                onCheckedChange={setUseGradients} 
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChartSettings;
