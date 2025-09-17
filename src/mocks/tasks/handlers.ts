import { http, HttpResponse } from 'msw';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { TaskFormData } from '#/schemas/taskFormSchema';
import { Task } from '#/types/task.types';
import { mockTasks, mockAssignees } from './data';

// In-memory storage for tasks (simulates database)
let tasks = [...mockTasks];

export const taskHandlers = [
  // Get tasks for a project
  http.get(apiEndpoints.TASKS.LIST, ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const projectTasks = tasks.filter(task => task.projectId === projectId);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = projectTasks.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedTasks,
      pagination: {
        page,
        pageSize,
        totalCount: projectTasks.length,
        totalPages: Math.ceil(projectTasks.length / pageSize),
        hasNextPage: endIndex < projectTasks.length,
        hasPreviousPage: page > 1,
      },
    });
  }),

  // Get a single task
  http.get(`${apiEndpoints.TASKS.LIST}/:taskId`, ({ params }) => {
    const { taskId } = params;
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return HttpResponse.json(task);
  }),

  // Create a new task
  http.post(apiEndpoints.TASKS.LIST, async ({ request }) => {
    const body = (await request.json()) as TaskFormData & { projectId: string };

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: body.title,
      description: body.description,
      priority: body.priority,
      status: body.status,
      dueDate: body.dueDate,
      projectId: body.projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: tasks.filter(t => t.status === body.status && t.projectId === body.projectId).length,
      assignee: body.assigneeId ? mockAssignees.find(a => a.id === body.assigneeId) : undefined,
    };

    tasks.push(newTask);


    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update a task
  http.put(`${apiEndpoints.TASKS.LIST}/:taskId`, async ({ params, request }) => {
    const { taskId } = params;
    const body = (await request.json()) as Partial<TaskFormData>;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...body,
      priority: body.priority || tasks[taskIndex].priority,
      status: body.status || tasks[taskIndex].status,
      order: body.order !== undefined ? body.order : tasks[taskIndex].order,
      updatedAt: new Date().toISOString(),
      assignee: body.assigneeId ? mockAssignees.find(a => a.id === body.assigneeId) : tasks[taskIndex].assignee,
    };

    tasks[taskIndex] = updatedTask;


    return HttpResponse.json(updatedTask);
  }),

  // Delete a task
  http.delete(`${apiEndpoints.TASKS.LIST}/:taskId`, ({ params }) => {
    const { taskId } = params;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    tasks.splice(taskIndex, 1);


    return HttpResponse.json({ message: 'Task deleted successfully' });
  }),

  // Get assignees
  http.get('/assignees', () => {
    return HttpResponse.json(mockAssignees);
  }),
];
