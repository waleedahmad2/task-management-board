import { JSX, useCallback, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { CommentsDrawer, KeyboardShortcutsHelp, TaskDetailSkeleton } from '#/components';
import { ROUTES } from '#/constants';
import { useGetTask } from '#/data/tasks/queries/getTask';
import { useKeyboardShortcuts } from '#/hooks';
import { TaskDetailContent } from './TaskDetailContent';
import { TaskDetailHeader } from './TaskDetailHeader';

const TaskDetailPage = (): JSX.Element => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const {
    data: task,
    isLoading,
    error,
  } = useGetTask({
    taskId: taskId || '',
  });

  const [isTaskSearchOpen, setIsTaskSearchOpen] = useState(false);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

  const handleBackToBoard = useCallback((): void => {
    navigate(ROUTES.PROJECT_BOARD.replace(':projectId', '1'));
  }, [navigate]);

  const handleNavigateToProjects = useCallback((): void => {
    navigate(ROUTES.PROJECTS);
  }, [navigate]);

  const handleOpenTaskSearch = useCallback((): void => {
    setIsTaskSearchOpen(true);
  }, []);

  const handleOpenCommentsDrawer = useCallback((): void => {
    setIsCommentsDrawerOpen(true);
  }, []);

  const handleCloseCommentsDrawer = useCallback((): void => {
    setIsCommentsDrawerOpen(false);
  }, []);

  useKeyboardShortcuts({
    onOpenSearch: handleOpenTaskSearch,
    isSearchOpen: isTaskSearchOpen,
  });

  if (isLoading) {
    return <TaskDetailSkeleton />;
  }

  if (error || !task) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-red-500'>Task not found</div>
      </div>
    );
  }

  return (
    <div className='h-screen bg-white flex flex-col'>
      {/* Fixed Header */}
      <div className='flex-shrink-0'>
        <TaskDetailHeader
          task={task}
          onNavigateToProjects={handleNavigateToProjects}
          onBackToBoard={handleBackToBoard}
        />
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-6'>
          <TaskDetailContent task={task} onOpenCommentsDrawer={handleOpenCommentsDrawer} />
        </div>
      </div>

      <CommentsDrawer isOpen={isCommentsDrawerOpen} onClose={handleCloseCommentsDrawer} task={task} />

      <KeyboardShortcutsHelp />
    </div>
  );
};

export default TaskDetailPage;
