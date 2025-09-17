import { JSX, useCallback, useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import {
  AppHeader,
  CommentsSidebar,
  CustomBreadcrumb,
  KeyboardShortcutsHelp,
  TaskSearch,
} from '#/components';
import { ROUTES } from '#/constants/routes';
import { useGetTasks } from '#/data/tasks/queries/getTasks';
import { updateTask, deleteTask } from '#/data/tasks/mutations';
import { useKeyboardShortcuts } from '#/hooks';
import { Task, TaskStatus, TaskPriority } from '#/types/task.types';
import { formatDate } from '#/utils';
import { Calendar, User, Clock, Edit3, Check, X, ChevronDown, ArrowLeft, Trash2, MoreHorizontal, Target, Flag, Timer, Hash, Link } from 'lucide-react';

const TaskDetailPage = (): JSX.Element => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const {
    data: tasksData,
    isLoading,
    error,
  } = useGetTasks({
    params: {
      projectId: '1',
      page: 1,
      pageSize: 100,
    },
  });

  const [isTaskSearchOpen, setIsTaskSearchOpen] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  const task = tasksData?.data?.find(t => t.id === taskId);

  const handleBackToBoard = useCallback((): void => {
    navigate(`/projects/1/board`);
  }, [navigate]);

  const handleOpenTaskSearch = useCallback((): void => {
    setIsTaskSearchOpen(true);
  }, []);

  const handleSelectTask = useCallback((selectedTask: Task): void => {
    navigate(`/tasks/${selectedTask.id}`);
  }, [navigate]);

  const handleDeleteTask = useCallback(async (): Promise<void> => {
    if (!task) return;
    
    try {
      await deleteTask(task.id);
      navigate(`/projects/1/board`);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, [task, navigate]);

  const handleStatusChange = useCallback(async (newStatus: TaskStatus): Promise<void> => {
    if (!task) return;

    try {
      await updateTask({
        taskId: task.id,
        updates: { status: newStatus },
      });
      setIsStatusDropdownOpen(false);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  }, [task]);

  const handleFieldEdit = useCallback((field: string, value: any): void => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFieldSave = useCallback(async (field: string): Promise<void> => {
    if (!task) return;

    const newValue = editValues[field];
    if (newValue === undefined || newValue === task[field as keyof Task]) {
      setEditingField(null);
      return;
    }

    try {
      const updates = field === 'assignee' 
        ? { assignee: { name: newValue, id: task.assignee?.id || 'temp-id' } }
        : { [field]: newValue };

      await updateTask({
        taskId: task.id,
        updates,
      });
      setEditingField(null);
      setEditValues(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error(`Failed to update task ${field}:`, error);
    }
  }, [task, editValues]);

  const handleFieldCancel = useCallback((field: string): void => {
    setEditingField(null);
    setEditValues(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setIsStatusDropdownOpen(false);
        setIsPriorityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onOpenSearch: handleOpenTaskSearch,
    isSearchOpen: isTaskSearchOpen,
  });

  const breadcrumbItems = [
    {
      label: 'Projects',
      onClick: () => navigate('/projects'),
    },
    {
      label: 'Project Board',
      onClick: handleBackToBoard,
    },
    {
      label: task?.title || 'Task Detail',
      isCurrentPage: true,
    },
  ] as const;

  const statusOptions = [
    { value: 'backlog', label: 'BACKLOG', color: 'bg-gray-500' },
    { value: 'in-progress', label: 'IN PROGRESS', color: 'bg-blue-500' },
    { value: 'review', label: 'REVIEW', color: 'bg-purple-500' },
    { value: 'done', label: 'DONE', color: 'bg-green-500' },
  ] as const;

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-400' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
  ] as const;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Loading task...</div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-red-500'>Task not found</div>
      </div>
    );
  }

  const currentStatus = statusOptions.find(s => s.value === task?.status);
  const currentPriority = priorityOptions.find(p => p.value === task?.priority);

  return (
    <div className='min-h-screen bg-white'>
      {/* Top Navigation */}
      <div className='border-b border-gray-200 px-6 py-3'>
      <CustomBreadcrumb items={breadcrumbItems} />
      </div>


      <div className='flex h-screen'>
        {/* Main Content */}
        <div className='flex-1 p-6 overflow-y-auto'>
          {/* Task Title */}
          <div className='mb-6'>
            {editingField === 'title' ? (
              <div className='flex items-center space-x-3'>
                <input
                  type='text'
                  value={editValues.title || task?.title || ''}
                  onChange={(e) => handleFieldEdit('title', e.target.value)}
                  className='text-3xl font-bold text-gray-900 bg-transparent border-none outline-none flex-1'
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFieldSave('title');
                    if (e.key === 'Escape') handleFieldCancel('title');
                  }}
                />
                <button
                  onClick={() => handleFieldSave('title')}
                  className='text-green-600 hover:bg-green-50 p-1 rounded'
                >
                  <Check className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleFieldCancel('title')}
                  className='text-gray-400 hover:bg-gray-100 p-1 rounded'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ) : (
              <div className='flex items-start justify-between group'>
                <h1 className='text-3xl font-bold text-gray-900'>{task?.title}</h1>
                <button
                  onClick={() => setEditingField('title')}
                  className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1'
                >
                  <Edit3 className='w-4 h-4' />
                </button>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
         

          {/* Properties Grid - ClickUp Style */}
          <div className='space-y-4 mb-8'>
            {/* Row 1 */}
            <div className='grid grid-cols-2 gap-8'>
              {/* Status */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <Target className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Status</span>
                </div>
                <div className='flex-1'>
                  <div className='relative' data-dropdown>
                    <button
                      onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                      className='flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded'
                    >
                      <div className={`w-3 h-3 rounded-full ${currentStatus?.color || 'bg-gray-400'}`} />
                      <span className={`px-3 py-1 text-xs font-semibold rounded text-white ${currentStatus?.color || 'bg-gray-400'}`}>
                        {currentStatus?.label || 'BACKLOG'}
                      </span>
                      <ChevronDown className='w-3 h-3 text-gray-400' />
                    </button>
                    {isStatusDropdownOpen && (
                      <div className='absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-40'>
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value as TaskStatus)}
                            className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg'
                          >
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            <span className={`px-2 py-1 text-xs font-semibold rounded text-white ${option.color}`}>
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Assignees */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <User className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Assignees</span>
                </div>
                <div className='flex-1'>
                  {editingField === 'assignee' ? (
                    <div className='flex items-center space-x-2'>
                      <input
                        type='text'
                        value={editValues.assignee || task?.assignee?.name || ''}
                        onChange={(e) => handleFieldEdit('assignee', e.target.value)}
                        className='flex-1 px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-blue-300'
                        placeholder='Enter assignee name'
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFieldSave('assignee');
                          if (e.key === 'Escape') handleFieldCancel('assignee');
                        }}
                      />
                      <button onClick={() => handleFieldSave('assignee')} className='text-green-600'>
                        <Check className='w-3 h-3' />
                      </button>
                      <button onClick={() => handleFieldCancel('assignee')} className='text-gray-400'>
                        <X className='w-3 h-3' />
                      </button>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-2 group'>
                      {task?.assignee?.name ? (
                        <div className='flex items-center space-x-2'>
                          <div className='w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold'>
                            {task.assignee.name.charAt(0).toUpperCase()}
                          </div>
                          <span className='text-sm'>{task.assignee.name}</span>
                        </div>
                      ) : (
                        <span className='text-sm text-gray-400'>Unassigned</span>
                      )}
                      <button
                        onClick={() => setEditingField('assignee')}
                        className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600'
                      >
                        <Edit3 className='w-3 h-3' />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className='grid grid-cols-2 gap-8'>
              {/* Dates */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Dates</span>
                </div>
                <div className='flex-1'>
                  {editingField === 'dueDate' ? (
                    <div className='flex items-center space-x-2'>
                      <input
                        type='date'
                        value={editValues.dueDate || task?.dueDate || ''}
                        onChange={(e) => handleFieldEdit('dueDate', e.target.value)}
                        className='px-2 py-1 border border-gray-300 rounded text-sm outline-none focus:border-blue-300'
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFieldSave('dueDate');
                          if (e.key === 'Escape') handleFieldCancel('dueDate');
                        }}
                      />
                      <button onClick={() => handleFieldSave('dueDate')} className='text-green-600'>
                        <Check className='w-3 h-3' />
                      </button>
                      <button onClick={() => handleFieldCancel('dueDate')} className='text-gray-400'>
                        <X className='w-3 h-3' />
                      </button>
                    </div>
                   ) : (
                     <div className='flex items-center space-x-2 group'>
                       <span className='text-sm'>
                         📅 {task?.dueDate ? formatDate(task.dueDate) : 'No due date'}
                       </span>
                       <button
                         onClick={() => setEditingField('dueDate')}
                         className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600'
                       >
                         <Edit3 className='w-3 h-3' />
                       </button>
                     </div>
                   )}
                </div>
              </div>

              {/* Priority */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <Flag className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Priority</span>
                </div>
                <div className='flex-1'>
                  <div className='relative' data-dropdown>
                    <button
                      onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
                      className='flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded'
                    >
                      <span className={`w-2 h-4 ${currentPriority?.color || 'bg-yellow-500'}`} />
                      <span className='text-sm font-medium'>{currentPriority?.label || 'High'}</span>
                      <ChevronDown className='w-3 h-3 text-gray-400' />
                    </button>
                    {isPriorityDropdownOpen && (
                      <div className='absolute z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-32'>
                        {priorityOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              if (task) {
                                handleFieldEdit('priority', option.value);
                                handleFieldSave('priority');
                              }
                            }}
                            className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center space-x-2 first:rounded-t-lg last:rounded-b-lg'
                          >
                            <span className={`w-2 h-4 ${option.color}`} />
                            <span className='text-sm'>{option.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className='grid grid-cols-2 gap-8'>
              {/* Time Estimate */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <Timer className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Time Estimate</span>
                </div>
                <div className='flex-1'>
                  <span className='text-sm'>25h</span>
                </div>
              </div>

              {/* Track Time */}
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-2 w-24'>
                  <Clock className='w-4 h-4 text-gray-500' />
                  <span className='text-sm font-medium text-gray-600'>Track Time</span>
                </div>
                <div className='flex-1'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-4 h-4 rounded-full border-2 border-gray-300' />
                    <span className='text-sm text-gray-500'>25h 38m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
           
          </div>

          {/* Task Description */}
          <div className='mb-8'>
            <div className='flex items-center space-x-2 mb-3'>
              <div className='w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs'>
                🎯
              </div>
              <h2 className='text-lg font-bold text-gray-900'>Task: {task?.title}</h2>
            </div>
            
            <div className='mb-4'>
              <h3 className='text-base font-semibold text-gray-900 mb-2'>Description</h3>
              {editingField === 'description' ? (
                <div className='flex space-x-3'>
                  <textarea
                    value={editValues.description || task?.description || ''}
                    onChange={(e) => handleFieldEdit('description', e.target.value)}
                    className='flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-300 resize-none'
                    rows={4}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) handleFieldSave('description');
                      if (e.key === 'Escape') handleFieldCancel('description');
                    }}
                    placeholder='Add a description...'
                  />
                  <div className='flex flex-col space-y-2'>
                    <button onClick={() => handleFieldSave('description')} className='text-green-600 p-1'>
                      <Check className='w-4 h-4' />
                    </button>
                    <button onClick={() => handleFieldCancel('description')} className='text-gray-400 p-1'>
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ) : (
                <div className='group'>
                  <div className='flex justify-between items-start'>
                    <p className='text-gray-700 leading-relaxed'>
                      {task?.description || 'No description provided'}
                    </p>
                    <button
                      onClick={() => setEditingField('description')}
                      className='opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1 ml-2'
                    >
                      <Edit3 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Activity */}
        <div className='w-80 border-l border-gray-200 bg-white flex flex-col'>
          <CommentsSidebar task={task} />
        </div>
      </div>

      {/* Task Search Modal */}
      <TaskSearch
        isOpen={isTaskSearchOpen}
        onClose={() => setIsTaskSearchOpen(false)}
        onSelectTask={handleSelectTask}
        tasks={tasksData?.data || []}
      />

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp />
    </div>
  );
};

export default TaskDetailPage;