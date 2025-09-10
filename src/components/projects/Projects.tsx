import { JSX, useState, useRef } from 'react';

import { AppHeader, PaginationFooter, ViewType } from '#/components/common';
import { TableSkeleton, KanbanColumnsSkeleton } from '#/components/skeletons';
import { useProjects } from '#/hooks';
import ProjectsTable from './ProjectsTable';
import ProjectStatusColumns from './ProjectStatusColumns';

/**
 * Projects component that displays the projects list with search functionality
 */
const Projects = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<ViewType>('table');

  // Use the custom projects hook
  const {
    projects,
    totalItems,
    currentPage,
    pageSize,
    isLoading,
    isSearching,
    goToPage,
    setSearchTerm,
    setPageSize,
  } = useProjects({
    pageSize: 10,
    searchDebounceMs: 300,
  });

  const handleSearch = (searchValue: string): void => {
    setSearchTerm(searchValue);
  };

  const handleProjectClick = (): void => {
    // TODO: Navigate to project board
    // navigate(`/projects/${project.id}/board`);
  };

  const [isSwitchingView, setIsSwitchingView] = useState<boolean>(false);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleViewChange = (view: ViewType): void => {
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    setIsSwitchingView(true);
    setCurrentView(view);
    switchTimerRef.current = setTimeout(() => setIsSwitchingView(false), 250);
  };

  return (
    <div className='flex flex-col h-full'>
      <AppHeader
        title='Projects'
        description={`${totalItems} projects found. Click on a project to open its board.`}
        showSearch={true}
        searchPlaceholder='Search projects'
        onSearch={handleSearch}
        showViewToggle={true}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <div className='flex-1 overflow-y-auto px-8 pb-20'>
        {currentView === 'table' ? (
          <>
            {isSwitchingView || isLoading || isSearching ? (
              <TableSkeleton rows={6} columns={6} />
            ) : (
              <ProjectsTable projects={projects} onProjectClick={handleProjectClick} loading={isLoading} />
            )}
          </>
        ) : (
          <>
            {isSwitchingView || isLoading || isSearching ? (
              <KanbanColumnsSkeleton columns={3} cardsPerColumn={3} />
            ) : (
              <ProjectStatusColumns projects={projects} onProjectClick={handleProjectClick} />
            )}
          </>
        )}
      </div>

      <div className='sticky bottom-0'>
        <PaginationFooter
          pageSizes={['10', '20', '50', '100']}
          pageSize={pageSize.toString()}
          setPageSize={(value: string) => setPageSize(parseInt(value))}
          currentPage={currentPage}
          handlePageChange={goToPage}
          totalCount={totalItems}
          isActionsDisabled={isSwitchingView}
          isLoading={isLoading || isSwitchingView}
        />
      </div>
    </div>
  );
};

export default Projects;
