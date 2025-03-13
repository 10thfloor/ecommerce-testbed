
import React from 'react';
import { Gem } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

interface LimitedEditionToggleProps {
  showLimitedEditionOnly: boolean;
  setShowLimitedEditionOnly: (value: boolean) => void;
  limitedEditionCount: number;
}

const LimitedEditionToggle = ({
  showLimitedEditionOnly,
  setShowLimitedEditionOnly,
  limitedEditionCount
}: LimitedEditionToggleProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between bg-purple-500/10 rounded-lg p-3 text-sm mb-4">
      <div className="flex items-center gap-2">
        <Gem className="h-4 w-4 text-purple-500" />
        <span className="font-medium text-purple-700 dark:text-purple-300">
          {t('product.limitedEditionItems')}
        </span>
        {limitedEditionCount > 0 && (
          <Badge variant="outline" className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
            {limitedEditionCount}
          </Badge>
        )}
      </div>
      <Switch
        checked={showLimitedEditionOnly}
        onCheckedChange={setShowLimitedEditionOnly}
        className="data-[state=checked]:bg-purple-500"
      />
    </div>
  );
};

export default LimitedEditionToggle;

