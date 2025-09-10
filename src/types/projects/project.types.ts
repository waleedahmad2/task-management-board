/**
 * Project status type
 */
export type ProjectStatus = 'active' | 'archived' | 'draft';

/**
 * Member role type
 */
export type MemberRole = 'admin' | 'editor' | 'viewer';

/**
 * Project member interface
 */
export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: MemberRole;
}

/**
 * Project owner interface
 */
export interface ProjectOwner {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * Project interface
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  owner: ProjectOwner;
  members: ProjectMember[];
}
