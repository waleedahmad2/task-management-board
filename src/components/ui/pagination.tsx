import * as React from 'react';

import { MoreHorizontalIcon } from 'lucide-react';

import { cn } from '#/utils';
import { buttonVariants } from './button';

function Pagination({ className, ...props }) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return <ul data-slot='pagination-content' className={cn('flex flex-row items-center', className)} {...props} />;
}

function PaginationItem({ ...props }) {
  return <li data-slot='pagination-item' {...props} />;
}

function PaginationLink({ className, isActive, size = 'icon', ...props }) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        'border border-gray-300 rounded-none',
        buttonVariants(
          {
            variant: isActive ? 'outline' : 'ghost',
            size,
          },
          isActive && 'bg-gray-100'
        ),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('gap-1 px-4 py-2.5 sm:pl-2.5 border border-gray-300', className)}
      {...props}
    />
  );
}

function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    />
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
