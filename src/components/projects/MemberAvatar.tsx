import { JSX } from 'react';

import TooltipWrapper from '#/components/ui/TooltipWrapper';
import { getSizeClasses } from '#/lib/utils';
import { MemberAvatarProps } from '#/types';
import { cn } from '#/utils';

/**
 * Get size classes
 */

/**
 * Member avatar component with role indicator and tooltip
 */
const MemberAvatar = ({ member, index, showTooltip = true, size = 'md' }: MemberAvatarProps): JSX.Element => {
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
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} className='w-full h-full rounded-full object-cover' />
        ) : (
          member.name.charAt(0).toUpperCase()
        )}
      </div>
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipWrapper content={`${member.name} (${member.role})`} side='top' align='center'>
        {avatarElement}
      </TooltipWrapper>
    );
  }

  return avatarElement;
};

export default MemberAvatar;
