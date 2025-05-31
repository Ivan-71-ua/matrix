import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type AppTooltipProps = {
  children: React.ReactNode;
  tooltipMessage: React.ReactNode;
};

const AppTooltip: React.FC<AppTooltipProps> = ({
  children,
  tooltipMessage,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppTooltip;
