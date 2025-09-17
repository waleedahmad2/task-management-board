import { http, HttpResponse } from 'msw';

import { tasksMockData } from '../tasksMockData';

export const tasksHandlers = [
  // Get single task by ID
  http.get('/tasks/:taskId', ({ params }) => {
    const { taskId } = params;
    const task = tasksMockData.find(t => t.id === taskId);

    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(task);
  }),

  // Get all tasks (for infinite scroll)
  http.get('/tasks', ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    // Filter by project if specified
    let filteredTasks = tasksMockData;
    if (projectId) {
      filteredTasks = tasksMockData.filter(task => task.projectId === projectId);
    }

    // Simple pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedTasks,
      pagination: {
        page,
        pageSize,
        totalCount: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / pageSize),
        hasNextPage: endIndex < filteredTasks.length,
        hasPreviousPage: page > 1,
      },
    });
  }),
];
