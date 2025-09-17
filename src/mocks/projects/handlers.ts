import { http, HttpResponse } from 'msw';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { mockComments } from '#/data/mocks/commentsMockData';
import { ProjectsData } from './data';
import { mockTasks } from '../tasks/data';

/**
 * Projects MSW handlers - backend logic
 */
export const projectsHandlers = [
  // Get projects list with pagination and search
  http.get(apiEndpoints.PROJECTS.LIST, async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const search = url.searchParams.get('search') || '';

    // Backend handles filtering and pagination
    let filteredProjects = ProjectsData;
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      filteredProjects = ProjectsData.filter(
        project =>
          project.name.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.owner.name.toLowerCase().includes(searchTerm) ||
          project.members.some(
            member => member.name.toLowerCase().includes(searchTerm) || member.email.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Calculate pagination
    const totalCount = filteredProjects.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const projects = filteredProjects.slice(startIndex, endIndex);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = {
      data: projects,
      pagination: {
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

  // Get tasks list for a project
  http.get(apiEndpoints.TASKS.LIST, async ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('project_id') || url.searchParams.get('projectId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('page_size') || url.searchParams.get('pageSize') || '10');
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
    const tasks = filteredTasks.slice(startIndex, endIndex);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = {
      data: tasks,
      pagination: {
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

  // Get comments list for a task
  http.get(apiEndpoints.COMMENTS.LIST, async ({ request }) => {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('task_id') || url.searchParams.get('taskId');
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('page_size') || url.searchParams.get('pageSize') || '10');

    // Filter comments by taskId and sort by creation date (oldest first)
    const filteredComments = mockComments
      .filter(comment => comment.taskId === taskId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Calculate pagination
    const totalCount = filteredComments.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const comments = filteredComments.slice(startIndex, endIndex);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const result = {
      data: comments,
      pagination: {
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

  // Create new comment
  http.post(apiEndpoints.COMMENTS.LIST, async ({ request }) => {
    const body = await request.json();
    const { content, taskId, sender } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Broadcast comment added event to all connected clients

    return HttpResponse.json(newComment, { status: 201 });
  }),
];
