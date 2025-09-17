import { JSX, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppHeader } from '#/components/common';
import { TableSkeleton, KanbanColumnsSkeleton } from '#/components/skeletons';
import { VIEW_TYPES, ViewType, ROUTES, PROJECTS_CONFIG } from '#/constants';
import { useProjects } from '#/hooks';
import { Project } from '#/types';
import ProjectsTable from './ProjectsTable';
import ProjectStatusColumns from './ProjectStatusColumns';

/**
 * Projects component that displays the projects list with search functionality
 */
const Projects = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<ViewType>(VIEW_TYPES.TABLE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  // Use the business logic hook for projects
  const {
    projects: allProjects,
    isLoading,
    error,
    isFetchingNextPage,
    handleSearchChange,
    handleScroll,
  } = useProjects({
    params: {
      pageSize: PROJECTS_CONFIG.INFINITE_SCROLL.PAGE_SIZE,
    },
  });

  // Search functionality
  const handleSearch = (searchValue: string): void => {
    handleSearchChange(searchValue);
    setSearchQuery(searchValue);
  };

  const handleProjectClick = (project: Project): void => {
    navigate(ROUTES.PROJECT_BOARD.replace(':projectId', project.id));
  };

  const [isSwitchingView, setIsSwitchingView] = useState<boolean>(false);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleViewChange = (view: ViewType): void => {
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    setIsSwitchingView(true);
    setCurrentView(view);
    switchTimerRef.current = setTimeout(() => setIsSwitchingView(false), 250);
  };

  if (error) {
    return (
      <div className='flex flex-col h-full'>
        <AppHeader title='Projects' showSearch={false} showViewToggle={false} />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-red-500'>Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <AppHeader
        title='Projects'
        showSearch={true}
        searchPlaceholder='Search projects'
        onSearch={handleSearch}
        showViewToggle={true}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <div className='flex-1 overflow-auto px-8 pb-20' onScroll={handleScroll}>
        {currentView === VIEW_TYPES.TABLE ? (
          <>
            {isSwitchingView ? (
              <TableSkeleton rows={6} columns={6} />
            ) : isLoading ? (
              <TableSkeleton rows={6} columns={6} />
            ) : (
              <ProjectsTable projects={allProjects} onProjectClick={handleProjectClick} loading={false} />
            )}
          </>
        ) : (
          <>
            {isSwitchingView ? (
              <KanbanColumnsSkeleton columns={3} cardsPerColumn={3} />
            ) : isLoading ? (
              <KanbanColumnsSkeleton columns={3} cardsPerColumn={3} />
            ) : (
              <ProjectStatusColumns onProjectClick={handleProjectClick} searchQuery={searchQuery} />
            )}
          </>
        )}

        {/* Loading indicator for infinite scroll only */}
        {isFetchingNextPage && (
          <div className='flex items-center justify-center py-4'>
            <div className='text-gray-500'>Loading more projects...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
