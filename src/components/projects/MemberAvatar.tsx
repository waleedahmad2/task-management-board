import { JSX } from 'react';

import { TooltipWrapper } from '#/components/common';
import { getSizeClasses } from '#/lib/utils';
import { MemberAvatarProps } from '#/types';
import { cn } from '#/utils';

/**
 * Member avatar component with role indicator and tooltip
 */
const MemberAvatar = ({ member, index, showTooltip = true, size = 'md' }: MemberAvatarProps): JSX.Element => {
  const { name, avatar, role } = member || {};
  const { avatar: avatarSize } = getSizeClasses(size);
  const zIndex = 10 - index;

  const avatarElement = (
    <div className='relative group/member' style={{ zIndex }}>
      <div
        className={cn(
          'bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold border-3 border-white shadow-sm group-hover/member:scale-110 transition-transform duration-200',
          avatarSize
        )}
      >
        {avatar ? (
          <img src={avatar} alt={name} className='w-full h-full rounded-full object-cover' />
        ) : (
          name?.charAt(0).toUpperCase()
        )}
      </div>
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipWrapper content={`${name} (${role})`} side='top' align='center'>
        {avatarElement}
      </TooltipWrapper>
    );
  }

  return avatarElement;
};

export default MemberAvatar;
