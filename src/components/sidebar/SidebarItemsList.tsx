import { JSX, useMemo } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { NAVIGATION_ITEMS } from '#/constants';
import SidebarListItem from './SidebarListItem';

const SELECTED_KEY = 'sidebar:selected:path';

/**
 * Sidebar navigation items list component
 */
const SidebarItemsList = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigation = (path: string): void => {
    localStorage.setItem(SELECTED_KEY, path);
    navigate(path);
  };

  const persistedSelectedPath = useMemo<string | null>(() => {
    try {
      return localStorage.getItem(SELECTED_KEY);
    } catch {
      return null;
    }
  }, []);

  const selectedPath = pathname && pathname !== '' ? pathname : persistedSelectedPath || '';

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
