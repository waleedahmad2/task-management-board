import { Project } from './project.types';

/**
 * Props for ProjectStatusColumns component
 */
export interface ProjectStatusColumnsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onProjectEdit?: (project: Project) => void;
  onProjectDelete?: (project: Project) => void;
  onProjectView?: (project: Project) => void;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}
