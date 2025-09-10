import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui';
import { CustomSelectProps } from '#/types';
import { cn } from '#/utils';

const CustomSelect = ({
  title = '',
  dropdownItemsList = [],
  dropdownItemName = '',
  placeholder = '',
  className = '',
  triggerClassName = '',
  downloadIcon = false,
  value = '',
  onChange,
  textClassname,
  isActionsDisabled,
  selectItemClassName,
}: CustomSelectProps) => (
  <div className='flex gap-4'>
    {title && (
      <span className='font-medium text-sm leading-5 text-gray-900 flex items-center whitespace-nowrap'>{title}</span>
    )}
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('h-9.5', triggerClassName)} disabled={isActionsDisabled}>
        <SelectValue className={cn('!text-sm !text-red', textClassname)} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn('', className)}>
        {dropdownItemsList?.map(item => (
          <SelectItem
            className={cn('text-base rounded-none hover:bg-gray-50 data-[selected]:bg-gray-50', selectItemClassName)}
            key={item}
            value={item}
          >
            {downloadIcon && <img src='/app/svgs/pdf.svg' alt='document icon' className='w-6 h-6 mr-2' />}
            {item} {dropdownItemName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default CustomSelect;
