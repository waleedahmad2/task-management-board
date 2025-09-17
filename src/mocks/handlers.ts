import { authHandlers } from './auth';
import { commentHandlers } from './comments/handlers';
import { projectsHandlers } from './projects/handlers';
import { taskHandlers } from './tasks/handlers';

/**
 * MSW handlers for mocking API responses - backend logic
 */
export const handlers = [...authHandlers, ...projectsHandlers, ...taskHandlers, ...commentHandlers];
