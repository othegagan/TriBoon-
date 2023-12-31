import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";

import { getMonth } from "../util";
import Labels from '../components/Calendar/Labels'
import CalendarHeader from "../components/Calendar/CalendarHeader";
import Month from "../components/Calendar/Month";
import EventModal from "../components/Calendar/EventModal";
import GlobalContext from "../context/GlobalContext";


const Scheduler = () => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);

    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);


    return (
        <div className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                }`}>
            <Sidebar active="scheduler" />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <div className=" md:flex md:flex-row justify-between items-center xs:flex-col xs:items-start">
                        <PageTitle>Schedular</PageTitle>
                        <CalendarHeader />
                    </div>
                    {showEventModal && <EventModal />}

                    <Labels />
                    <div className=" h-screen flex flex-col ">
                        <div className="flex flex-1 w-full">
                            <Month month={currenMonth} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scheduler;




