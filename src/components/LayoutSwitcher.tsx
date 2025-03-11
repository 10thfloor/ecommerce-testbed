
import React from 'react';
import { LayoutType, useLayout } from '@/contexts/LayoutContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LayoutDashboard, LayoutGrid, LayoutList } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const LayoutSwitcher: React.FC = () => {
  const { layout, setLayout } = useLayout();
  const isMobile = useMobile();

  if (isMobile) return null;

  const layouts: { type: LayoutType; icon: React.ReactNode; label: string }[] = [
    { 
      type: 'default', 
      icon: <LayoutDashboard className="h-4 w-4" />, 
      label: 'Default Layout' 
    },
    { 
      type: 'compact', 
      icon: <LayoutGrid className="h-4 w-4" />, 
      label: 'Compact Layout' 
    },
    { 
      type: 'wide', 
      icon: <LayoutList className="h-4 w-4" />, 
      label: 'Wide Layout' 
    },
  ];

  return (
    <div className="flex items-center space-x-1 bg-card/40 p-1 rounded-md backdrop-blur-sm animate-fade-in">
      {layouts.map(({ type, icon, label }) => (
        <Tooltip key={type} delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLayout(type)}
              className={cn(
                "rounded-md h-8 w-8 p-0",
                layout === type && "bg-primary/15 text-primary"
              )}
            >
              {icon}
              <span className="sr-only">{label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default LayoutSwitcher;
