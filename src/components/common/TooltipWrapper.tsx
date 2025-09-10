import { JSX, ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

/**
 * Props for TooltipWrapper component
 */
interface TooltipWrapperProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * Reusable tooltip wrapper component using shadcn tooltip
 */
const TooltipWrapper = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className = '',
}: TooltipWrapperProps): JSX.Element => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent side={side} align={align} className={className}>
      {content}
    </TooltipContent>
  </Tooltip>
);

export default TooltipWrapper;
