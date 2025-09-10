import { Project } from './project.types';

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  className?: string;
}
