
import React from 'react';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ThemeToggle: React.FC = () => {
  const { appTheme, setAppTheme } = useAppTheme();

  const toggleTheme = () => {
    setAppTheme(appTheme === 'default' ? 'arcteryx' : 'default');
  };

  return (
    <div className="flex items-center gap-2 bg-card/40 p-2 rounded-md backdrop-blur-sm animate-fade-in">
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleTheme}>
            <Switch 
              id="theme-toggle" 
              checked={appTheme === 'arcteryx'} 
              onCheckedChange={toggleTheme}
              className="h-4 data-[state=checked]:bg-accent"
            />
            <span className="text-xs font-medium">
              {appTheme === 'default' ? 'Default' : 'Arc\'teryx'}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Toggle between themes</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ThemeToggle;
