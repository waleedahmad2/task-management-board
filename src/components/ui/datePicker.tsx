import { JSX, useState } from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '#/components/ui/Button';
import { Calendar } from '#/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover';
import { cn } from '#/lib/utils';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Date picker component using Shadcn UI Calendar
 */
export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  disabled = false,
  className,
}: DatePickerProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined): void => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground', className)}
          disabled={disabled}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? format(value, 'PPP') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar mode='single' selected={value} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
