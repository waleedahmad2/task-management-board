import { JSX, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppHeader, PaginationFooter, ProjectBoardCard, TableSkeleton } from '#/components';
import { PAGE_SIZES, ROUTES } from '#/constants';
import { useProjectsListing } from '#/hooks';
import { Project } from '#/types';

/**
 * BoardsPage component that displays all project boards
 * Users can click on any project to navigate to its board
 */
export default function BoardsPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Use the custom projects hook
  const {
    projects,
    totalItems,
    filters,
    isProjectsFetching,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  } = useProjectsListing();

  const handleSearch = (searchValue: string): void => {
    setSearchTerm(searchValue);
    handleSearchChange(searchValue);
  };

  const handlePageSizeSelect = (value: string) => {
    handlePageSizeChange(parseInt(value));
  };

  const handleProjectClick = (project: Project): void => {
    navigate(ROUTES.PROJECT_BOARD.replace(':projectId', project.id));
  };

  const filteredProjects = projects.filter(
    project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isProjectsFetching) {
    return (
      <div className='flex flex-col h-full'>
        <AppHeader
          title='Project Boards'
          subtitle='Access all your project boards'
          onSearchChange={handleSearch}
          searchValue={searchTerm}
          showSearch={true}
        />
        <div className='flex-1 p-6'>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <AppHeader
        title='Project Boards'
        subtitle='Access all your project boards'
        onSearchChange={handleSearch}
        searchValue={searchTerm}
        showSearch={true}
      />

      <div className='flex-1 p-6'>
        {filteredProjects.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📋</div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No boards found</h3>
            <p className='text-gray-500'>
              {searchTerm ? 'No projects match your search criteria.' : 'No projects available yet.'}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProjects.map(project => (
              <ProjectBoardCard key={project.id} project={project} onProjectClick={handleProjectClick} />
            ))}
          </div>
        )}
      </div>

      {filteredProjects.length > 0 && (
        <PaginationFooter
          currentPage={filters.page}
          totalPages={Math.ceil(totalItems / filters.pageSize)}
          totalItems={totalItems}
          pageSize={filters.pageSize}
          pageSizeOptions={PAGE_SIZES}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeSelect}
        />
      )}
    </div>
  );
}
