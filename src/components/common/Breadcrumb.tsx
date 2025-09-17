import { JSX, Fragment } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui';
import { cn } from '#/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonLabel?: string;
  backButtonHref?: string;
  onBackClick?: () => void;
  className?: string;
  separator?: React.ReactNode;
}

/**
 * Reusable Breadcrumb component using Shadcn UI
 * Supports navigation, custom separators, and back button
 */
export const Breadcrumb = ({
  items,
  showBackButton = false,
  backButtonLabel = 'Back',
  backButtonHref,
  onBackClick,
  className = '',
  separator,
}: BreadcrumbProps): JSX.Element => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backButtonHref) {
      navigate(backButtonHref);
    }
  };

  return (
    <BreadcrumbPrimitive className={cn('mb-4', className)}>
      <BreadcrumbList>
        {showBackButton && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={handleBackClick}
                className='flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>{backButtonLabel}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{separator || '/'}</BreadcrumbSeparator>
          </>
        )}

        {items.map((item, index) => {
          const { label, href, onClick, isCurrentPage: itemIsCurrentPage } = item;
          const isLast = index === items.length - 1;
          const isCurrentPage = itemIsCurrentPage || isLast;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage className='text-gray-900 font-medium'>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={href}
                    onClick={onClick}
                    className='hover:text-blue-600 transition-colors cursor-pointer'
                  >
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator>{separator || '/'}</BreadcrumbSeparator>}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
};

export default Breadcrumb;
