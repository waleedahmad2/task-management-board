import { JSX, useState, useMemo, useEffect, useRef } from 'react';

import { AppHeader, ViewType, Pagination } from '#/components/common';
import { TableSkeleton, KanbanColumnsSkeleton } from '#/components/skeletons';
import { dummyProjects } from '#/data/projects/dummyData';
import { usePagination } from '#/hooks/usePagination';
import ProjectsTable from './ProjectsTable';
import ProjectStatusColumns from './ProjectStatusColumns';

/**
 * Projects component that displays the projects list with search functionality
 */
const Projects = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [projects] = useState(dummyProjects);
  const [isLoading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('table');

  // Debounced search value to control skeleton visibility and expensive filtering
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 250);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchValue]);

  const filteredProjects = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter(
      project =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.owner.name.toLowerCase().includes(term)
    );
  }, [debouncedSearch]);

  // Pagination hook
  const { paginatedData, currentPage, totalPages, goToPage, totalItems } = usePagination(filteredProjects, {
    pageSize: 10,
  });

  const handleSearch = (searchValue: string): void => {
    setSearchValue(searchValue);
    goToPage(1);
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

  const isSearching = searchValue !== debouncedSearch;

  return (
    <div>
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

      <div className='px-8 pb-8'>
        {currentView === 'table' ? (
          <>
            {isSwitchingView || isSearching || isLoading ? (
              <TableSkeleton rows={6} columns={6} />
            ) : (
              <ProjectsTable projects={paginatedData} onProjectClick={handleProjectClick} loading={isLoading} />
            )}

            {totalPages > 1 && !isSearching && !isSwitchingView && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
            )}
          </>
        ) : (
          <>
            {isSwitchingView || isSearching || isLoading ? (
              <KanbanColumnsSkeleton columns={3} cardsPerColumn={3} />
            ) : (
              <ProjectStatusColumns projects={paginatedData} onProjectClick={handleProjectClick} />
            )}

            {totalPages > 1 && !isSearching && !isSwitchingView && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
