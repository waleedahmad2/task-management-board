import React, { lazy } from 'react';

import { ROUTES } from '#/constants';

const ProjectsPage = lazy(() => import('#/pages/ProjectPage'));
const BoardsPage = lazy(() => import('#/pages/BoardsPage'));
const TasksPage = lazy(() => import('#/pages/TasksPage'));

export interface AppSidebarRouteConfig {
  path: string;
  Component: React.ComponentType;
}

export const appSidebarRoutes: AppSidebarRouteConfig[] = [
  { path: ROUTES.PROJECTS, Component: ProjectsPage },
  { path: ROUTES.BOARDS, Component: BoardsPage },
  { path: ROUTES.TASKS, Component: TasksPage },
];
