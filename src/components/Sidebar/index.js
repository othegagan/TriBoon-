import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

const  Sidebar =({active})=> {
    return (
        <>
            <DesktopSidebar active={active} />
            <MobileSidebar active={active}/>
        </>
    )
}

export default Sidebar
