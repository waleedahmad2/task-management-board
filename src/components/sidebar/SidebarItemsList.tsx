import { JSX, useMemo } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { NAVIGATION_ITEMS, ROUTES } from '#/constants';
import { getLocalStorageItem, setLocalStorageItem } from '#/utils';
import SidebarListItem from './SidebarListItem';

const SELECTED_KEY = 'sidebar:selected:path';

/**
 * Sidebar navigation items list component
 */
const SidebarItemsList = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigation = (path: string): void => {
    setLocalStorageItem(SELECTED_KEY, path);
    navigate(path);
  };

  const persistedSelectedPath = getLocalStorageItem<string>(SELECTED_KEY);

  // Determine the selected path, considering project board routes as Boards
  const selectedPath = useMemo(() => {
    if (pathname && pathname !== '') {
      // If we're on a project board route, consider Boards as selected
      if (pathname.startsWith('/projects/') && pathname.endsWith('/board')) {
        return ROUTES.BOARDS;
      }
      return pathname;
    }
    return persistedSelectedPath || '';
  }, [pathname, persistedSelectedPath]);

  const handlersByPath: Record<string, () => void> = useMemo(() => {
    const map: Record<string, () => void> = {};
    NAVIGATION_ITEMS.forEach(({ path }) => {
      map[path] = () => handleNavigation(path);
    });
    return map;
  }, []);

  const isActive = (path: string): boolean => selectedPath === path;

  return (
    <nav className='flex-1 p-4 space-y-2'>
      {NAVIGATION_ITEMS.map(({ id, icon, label, description, path }) => (
        <SidebarListItem
          key={id}
          icon={icon}
          label={label}
          description={description}
          isActive={isActive(path)}
          onClick={handlersByPath[path]}
        />
      ))}
    </nav>
  );
};

export default SidebarItemsList;
