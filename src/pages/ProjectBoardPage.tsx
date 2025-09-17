import { JSX, useCallback, useEffect, useState } from 'react';

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
import { TASK_MODAL_MODES, TASK_MODAL_TITLES, TASK_MODAL_DESCRIPTIONS } from '#/constants/task';
import { ROUTES } from '#/constants/routes';
import { useGetTasks } from '#/data/tasks/queries/getTasks';
import { createTask, updateTask, deleteTask } from '#/data/tasks/mutations';
import { useKeyboardShortcuts } from '#/hooks';
import { taskFormSchema } from '#/schemas';
import { Task, TaskStatus, TaskDragResult } from '#/types/task.types';

const ProjectBoardPage = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const {
    data: tasksData,
    isLoading,
    error,
  } = useGetTasks({
    params: {
      projectId: projectId || '1', // Default to project 1 for testing
      page: 1,
      pageSize: 100,
    },
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('backlog');
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [isTaskSearchOpen, setIsTaskSearchOpen] = useState(false);

  useEffect(() => {
    if (tasksData?.data) {
      setTasks(tasksData.data);
    }
  }, [tasksData]);

  const handleTaskClick = (task: Task): void => {
    navigate(`/tasks/${task.id}`);
  };

  const handleAddTask = (status: TaskStatus): void => {
    setSelectedStatus(status);
    setModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = async (data: unknown): Promise<void> => {
    try {
      const validatedData = taskFormSchema.parse(data);
      
      if (modalMode === 'create') {
        // Create optimistic task
        const optimisticTask: Task = {
          id: `temp-${Date.now()}`,
          title: validatedData.title,
          description: validatedData.description,
          priority: validatedData.priority,
          dueDate: validatedData.dueDate,
          assignee: validatedData.assigneeId ? {
            id: validatedData.assigneeId,
            name: 'Loading...',
            email: '',
          } : undefined,
          status: validatedData.status,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          projectId: projectId || '1',
          order: 0,
        };

        // Add optimistically
        setTasks(prev => [...prev, optimisticTask]);
        setIsTaskModalOpen(false);

        // Create real task
        const newTask = await createTask({ formData: validatedData, projectId: projectId || '1' });
        
        // Replace optimistic with real
        setTasks(prev => prev.map(task => 
          task.id === optimisticTask.id ? newTask : task
        ));
      } else if (modalMode === 'edit' && editingTask) {
        // Update optimistically
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...validatedData, updatedAt: new Date().toISOString() }
            : task
        ));
        setIsTaskModalOpen(false);
        setEditingTask(null);

        // Update real task
        const updatedTask = await updateTask({ taskId: editingTask.id, updates: validatedData });
        
        // Replace optimistic with real
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
      }
    } catch (error) {
      console.error(`Failed to ${modalMode} task:`, error);
      // Revert optimistic changes on error
      if (modalMode === 'create') {
        setTasks(prev => prev.filter(task => !task.id.startsWith('temp-')));
      }
      // Re-open modal on error
      setIsTaskModalOpen(true);
    }
  };


  const handleCloseCommentsDrawer = (): void => {
    setIsCommentsDrawerOpen(false);
    setSelectedTask(null);
  };

  const handleTaskMove = async (result: TaskDragResult): Promise<void> => {
    const { taskId, sourceColumn, targetColumn, sourceIndex, targetIndex } = result;
    
    // Find the task being moved
    const taskToMove = tasks.find(task => task.id === taskId);
    if (!taskToMove) return;

    // Update optimistically first
    setTasks(prev => {
      const newTasks = [...prev];
      const taskIndex = newTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Update the task with new status and order
        newTasks[taskIndex] = {
          ...newTasks[taskIndex],
          status: targetColumn,
          order: targetIndex,
          updatedAt: new Date().toISOString(),
        };
      }
      
      return newTasks;
    });

    try {
      // Call the API to persist the change
      await updateTask({ 
        taskId, 
        updates: { 
          status: targetColumn,
          order: targetIndex 
        } 
      });
    } catch (error) {
      console.error('Failed to move task:', error);
      // Revert on error
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: sourceColumn, order: sourceIndex }
          : task
      ));
    }
  };

  const handleTaskEdit = (task: Task): void => {
    setEditingTask(task);
    setModalMode('edit');
    setIsTaskModalOpen(true);
  };

  const handleTaskDelete = async (task: Task): Promise<void> => {
    // Store original task for rollback
    const originalTask = task;
    
    // Remove optimistically
    setTasks(prev => prev.filter(t => t.id !== task.id));
    
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Revert optimistic change on error
      setTasks(prev => [...prev, originalTask]);
    }
  };


  const handleNavigateToBoards = useCallback((): void => {
    navigate(ROUTES.BOARDS);
  }, [navigate]);

  const handleCreateTask = useCallback((): void => {
    setSelectedStatus('backlog');
    setModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
  }, []);

  const handleOpenTaskSearch = useCallback((): void => {
    setIsTaskSearchOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSaveTask = useCallback((): void => {
    // This will be handled by the form submission
    // The keyboard shortcut will trigger the form's submit
    const submitButton = document.querySelector('[type="submit"]') as HTMLButtonElement;
    submitButton?.click();
  }, []);

  const handleSelectTask = useCallback((task: Task): void => {
    setSelectedTask(task);
    setIsCommentsDrawerOpen(true);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onCreateTask: handleCreateTask,
    onOpenSearch: handleOpenTaskSearch,
    onCloseModal: handleCloseModal,
    onSaveTask: handleSaveTask,
    isModalOpen: isTaskModalOpen,
    isSearchOpen: isTaskSearchOpen,
  });

  const breadcrumbItems = [
    {
      label: 'Boards',
      onClick: handleNavigateToBoards,
    },
    {
      label: `Project ${projectId} Board`,
      isCurrentPage: true,
    },
  ] as const;

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

      <TaskBoard
        tasks={tasks}
        onTaskClick={handleTaskClick}
        onAddTask={handleAddTask}
        onTaskMove={handleTaskMove}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={handleTaskDelete}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleTaskSubmit}
        defaultStatus={modalMode === 'create' ? selectedStatus : undefined}
        initialData={
          modalMode === 'edit' && editingTask
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
        title={TASK_MODAL_TITLES[TASK_MODAL_MODES[modalMode.toUpperCase() as keyof typeof TASK_MODAL_MODES]]}
        description={TASK_MODAL_DESCRIPTIONS[TASK_MODAL_MODES[modalMode.toUpperCase() as keyof typeof TASK_MODAL_MODES]]}
      />

      <CommentsDrawer isOpen={isCommentsDrawerOpen} onClose={handleCloseCommentsDrawer} task={selectedTask} />

      <TaskSearch
        isOpen={isTaskSearchOpen}
        onClose={() => setIsTaskSearchOpen(false)}
        onSelectTask={handleSelectTask}
        tasks={tasks}
      />

      <KeyboardShortcutsHelp />
    </div>
  );
};

export default ProjectBoardPage;
