import { JSX } from 'react';

import { SidebarFooter, SidebarHeader, SidebarItemsList } from '.';

/**
 * Main sidebar component that combines all sidebar parts
 */
const Sidebar = (): JSX.Element => (
  <div className='flex flex-col h-full bg-white border-r border-gray-200 w-64'>
    <SidebarHeader />
    <SidebarItemsList />
    <SidebarFooter />
  </div>
);

export default Sidebar;
