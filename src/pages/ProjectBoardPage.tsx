import { JSX, useCallback, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import {
  CommentsDrawer,
  CustomBreadcrumb,
  KeyboardShortcutsHelp,
  TaskSearch,
  TaskBoard,
  TaskModal,
  ProjectBoardSkeleton,
} from '#/components';
import { ROUTES, TASK_MODAL_MODES, BREADCRUMB_ITEMS } from '#/constants';
import { useKeyboardShortcuts } from '#/hooks';
import { useTasksPerColumn } from '#/hooks/tasks/useTasksPerColumn';
import { Task, TaskStatus } from '#/types';

const ProjectBoardPage = (): JSX.Element => {
  // 1. CONSTANTS
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 2. STATE
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('backlog');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>(TASK_MODAL_MODES.CREATE);
  const [isTaskSearchOpen, setIsTaskSearchOpen] = useState(false);

  // 3. HOOKS
  const {
    // Data
    tasksByStatus,
    allTasks,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,

    // Comments drawer state
    isCommentsDrawerOpen,
    selectedTask,

    // Heavy task operations
    handleTaskSubmit,
    handleTaskDelete,
    handleTaskMove,

    // Comments drawer actions
    handleSelectTask,
    handleCloseCommentsDrawer,

    // Per-column scroll handlers
    columnScrollHandlers,
  } = useTasksPerColumn({ projectId: projectId || '' });

  // 4. HANDLERS
  const handleTaskClick = useCallback(
    (task: Task): void => {
      navigate(`${ROUTES.TASKS}/${task.id}`);
    },
    [navigate]
  );

  const handleOpenTaskSearch = useCallback((): void => {
    setIsTaskSearchOpen(true);
  }, []);

  const handleCloseTaskSearch = useCallback((): void => {
    setIsTaskSearchOpen(false);
  }, []);

  const handleAddTask = useCallback((status: TaskStatus): void => {
    setSelectedStatus(status);
    setModalMode(TASK_MODAL_MODES.CREATE);
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const handleTaskEdit = useCallback((task: Task): void => {
    setEditingTask(task);
    setModalMode(TASK_MODAL_MODES.EDIT);
    setIsTaskModalOpen(true);
  }, []);

  const handleCreateTask = useCallback((): void => {
    setSelectedStatus('backlog');
    setModalMode(TASK_MODAL_MODES.CREATE);
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSaveTask = useCallback((): void => {
    const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
    submitButton?.click();
  }, []);

  const handleTaskSubmitWrapper = useCallback(
    async (data: unknown): Promise<void> => {
      try {
        await handleTaskSubmit(data, modalMode, editingTask);
        setIsTaskModalOpen(false);
        setEditingTask(null);
      } catch (error) {
        // Keep modal open on error
        console.error('Task submission failed:', error);
      }
    },
    [handleTaskSubmit, modalMode, editingTask]
  );

  const handleNavigateToBoards = useCallback((): void => {
    navigate(ROUTES.BOARDS);
  }, [navigate]);

  // 5. EFFECTS & ADDITIONAL HOOKS
  useKeyboardShortcuts({
    onCreateTask: handleCreateTask,
    onOpenSearch: handleOpenTaskSearch,
    onCloseModal: handleCloseModal,
    onSaveTask: handleSaveTask,
    isModalOpen: isTaskModalOpen,
    isSearchOpen: isTaskSearchOpen,
  });

  // 6. COMPUTED VALUES
  const breadcrumbItems = [...BREADCRUMB_ITEMS.PROJECT_BOARD(projectId || '1', handleNavigateToBoards)];

  // 7. CONDITIONAL RENDERS
  if (isLoading) {
    return <ProjectBoardSkeleton />;
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-red-500'>Error loading tasks: {error.message}</div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        {/* Breadcrumb Navigation */}
        <CustomBreadcrumb
          items={breadcrumbItems}
          showBackButton={true}
          backButtonLabel='Back to Boards'
          onBackClick={handleNavigateToBoards}
        />

        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Project Board</h1>
            <p className='text-gray-600'>Manage tasks for project {projectId}</p>
          </div>
        </div>
      </div>

      <div className=' overflow-x-auto' data-scroll-container>
        <div className='relative'>
          <TaskBoard
            tasksByStatus={tasksByStatus}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
            onTaskMove={handleTaskMove}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            columnScrollHandlers={columnScrollHandlers}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleTaskSubmitWrapper}
        defaultStatus={modalMode === TASK_MODAL_MODES.CREATE ? selectedStatus : undefined}
        initialData={
          modalMode === TASK_MODAL_MODES.EDIT && editingTask
            ? {
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                status: editingTask.status,
                dueDate: editingTask.dueDate,
                assigneeId: editingTask.assignee?.id || '',
              }
            : {}
        }
        isEditMode={modalMode === TASK_MODAL_MODES.EDIT}
      />

      <CommentsDrawer isOpen={isCommentsDrawerOpen} onClose={handleCloseCommentsDrawer} task={selectedTask} />

      <TaskSearch
        isOpen={isTaskSearchOpen}
        onClose={handleCloseTaskSearch}
        onSelectTask={handleSelectTask}
        tasks={allTasks}
      />

      <KeyboardShortcutsHelp />
    </div>
  );
};

export default ProjectBoardPage;
