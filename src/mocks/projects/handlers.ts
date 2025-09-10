import { http, HttpResponse } from 'msw';

import { apiEndpoints } from '#/constants/apiEndpoints';
import { ProjectsData } from './data';

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
];
