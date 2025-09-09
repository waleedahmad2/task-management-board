import { JSX } from 'react';

import TooltipWrapper from '#/components/ui/TooltipWrapper';
import { cn } from '#/utils';

/**
 * Member role type
 */
type MemberRole = 'admin' | 'editor' | 'viewer';

/**
 * Project member interface
 */
interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: MemberRole;
}

/**
 * Props for MemberAvatar component
 */
interface MemberAvatarProps {
  member: ProjectMember;
  index: number;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Get size classes
 */
const getSizeClasses = (size: 'sm' | 'md' | 'lg'): { avatar: string; role: string } => {
  switch (size) {
    case 'sm':
      return {
        avatar: 'w-7 h-7 text-xs',
        role: 'w-4 h-4 text-xs',
      };
    case 'lg':
      return {
        avatar: 'w-11 h-11 text-sm',
        role: 'w-6 h-6 text-sm',
      };
    default: // md
      return {
        avatar: 'w-9 h-9 text-xs',
        role: 'w-5 h-5 text-xs',
      };
  }
};

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
