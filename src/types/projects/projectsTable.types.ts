import { Project } from './project.types';

/**
 * Props for ProjectsTable component
 */
export interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  loading?: boolean;
  className?: string;
}
