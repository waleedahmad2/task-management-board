import { http, HttpResponse } from 'msw';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { Task, TaskPriority, TaskStatus } from '#/types/task.types';
import { mockTasks, mockAssignees } from './data';

// In-memory storage for tasks (simulates database)
let tasks = [...mockTasks];

export const tasksHandlers = [
  http.get('/tasks', async ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const status = url.searchParams.get('status') || '';

    // Filter tasks by projectId
    let filteredTasks = mockTasks.filter(task => task.projectId === projectId);

    // Filter by status if provided
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    // Calculate pagination
    const totalCount = filteredTasks.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = {
      data: paginatedTasks,
      hasNext: page < totalPages, // ✅ Add root level hasNext
      total: totalCount, // ✅ Add total
      page, // ✅ Add page
      pageSize, // ✅ Add pageSize
      totalPages, // ✅ Add totalPages
      hasPreviousPage: page > 1, // ✅ Add hasPreviousPage
      pagination: {
        // ✅ Keep pagination object too
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };

    return HttpResponse.json(result);
  }),

  // Get single task by ID
  http.get(`${apiEndpoints.TASKS.DETAIL}/:taskId`, ({ params }) => {
    const { taskId } = params;
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(task);
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
    const body = (await request.json()) as Record<string, unknown>;

    // Handle both camelCase and snake_case field names
    const assigneeId = body.assigneeId || body.assignee_id;
    const dueDate = body.dueDate || body.due_date;
    const projectId = body.projectId || body.project_id;

    // Find assignee
    const assignee = assigneeId ? mockAssignees.find(a => a.id === assigneeId) : undefined;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: body.title,
      description: body.description,
      priority: body.priority as TaskPriority,
      status: body.status as TaskStatus,
      dueDate: dueDate,
      projectId: projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: tasks.filter(t => t.status === body.status && t.projectId === projectId).length,
      assignee: assignee,
    };

    tasks.push(newTask);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update a task
  http.put(`${apiEndpoints.TASKS.LIST}/:taskId`, async ({ params, request }) => {
    const { taskId } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Handle both camelCase and snake_case field names
    const assigneeId = body.assigneeId || body.assignee_id;
    const dueDate = body.dueDate || body.due_date;

    const updatedTask: Task = {
      ...tasks[taskIndex],
      // Only include the fields we want to update, not the entire body
      title: body.title,
      description: body.description,
      priority: (body.priority as TaskPriority) || tasks[taskIndex].priority,
      status: (body.status as TaskStatus) || tasks[taskIndex].status,
      order: body.order !== undefined ? body.order : tasks[taskIndex].order,
      updatedAt: new Date().toISOString(),
      assignee: assigneeId ? mockAssignees.find(a => a.id === assigneeId) : tasks[taskIndex].assignee,
      dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate,
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
