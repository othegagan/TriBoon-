import React from 'react'

import SidebarContent from './SidebarContent'

const DesktopSidebar = ({ active }) => {
    return (
        <aside className="z-30 flex-shrink-0 hidden w-64 min-h-full h-auto overflow-y-auto  bg-white dark:bg-gray-800 lg:block">
            <SidebarContent active={active} />
        </aside>
    )
}

export default DesktopSidebar
