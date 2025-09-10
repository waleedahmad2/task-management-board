import { ProjectMember } from './project.types';

/**
 * Props for MemberAvatar component
 */
export interface MemberAvatarProps {
  member: ProjectMember;
  index: number;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
