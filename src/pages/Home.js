import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { SidebarContext } from '../context/SidebarContext'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Pie } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { BugIcon, PeopleIcon, PagesIcon, DangerIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { UserAuth } from '../context/AuthContext'
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {

    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()

    useEffect(() => {
        closeSidebar()
        // eslint-disable-next-linea
    }, [location])


    const [usersCount, setUsersCount] = useState();
    const [projectsCount, setProjectsCount] = useState();
    const [ticketsCount, setTicketsCount] = useState();
    const { roleCount, statusCount, pCount, tCount } = UserAuth();

    const role = roleCount()
    const status = statusCount()
    const priority = pCount()
    const type = tCount()

    useEffect(() => {
        const usersCount = onSnapshot(collection(db, "users"),
            (snapShot) => {
                setUsersCount(snapShot.size)
            },
            (error) => {
                console.log(error);
            }
        );
        const projectsCount = onSnapshot(collection(db, "projects",),
            (snapShot) => {
                setProjectsCount(snapShot.size)
            },
            (error) => {
                console.log(error);
            }
        );

        const ticketsCount = onSnapshot(collection(db, "tickets",),
            (snapShot) => {
                setTicketsCount(snapShot.size)
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            usersCount();
            projectsCount();
            ticketsCount();
        };
    }, []);


    const roleOptions = {
        data: {
            datasets: [
                {
                    data: [role[0], role[1]],
                    backgroundColor: ['#8ab339', '#fbaf00'],
                    label: 'Dataset 1',
                },
            ],
            labels: ['Developers', 'Testers'],
        },
        options: {
            responsive: true,
            cutoutPercentage: 50,
        },
        legend: {
            display: false,
        }
    }

    const roleLegends = [
        { title: 'Developers', color: 'bg-yellow-400' },
        { title: 'Testers', color: 'bg-green-500' }
    ]

    const statusData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Dataset 2',
                backgroundColor: ['#3F83F8', '#6C2BD9', '#8ab339'],
                data: [status[0], status[1], status[2]]
            }
        ],
        options: {
            responsive: true,
        },
        legend: {
            display: false,
        }
    }

    const statusLegends = [
        { title: 'To Do', color: 'bg-blue-500' },
        { title: 'In Progress', color: 'bg-purple-600' },
        { title: 'Done', color: 'bg-green-500' },
    ]


    return (
        <div className={`flex h-full min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
            <Sidebar active="dashboard" />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="pl-6 pr-6 mt-5  dark:bg-gray-900 bg-gray-50 pb-6">
                    <PageTitle>Dashboard</PageTitle>

                    {/* <!-- Cards --> */}
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        <InfoCard title="Total Employees" value={usersCount}>
                            <RoundIcon
                                icon={PeopleIcon}
                                iconColorClass="text-green-500 dark:text-green-100"
                                bgColorClass="bg-green-100 dark:bg-green-500"
                                className="mr-4"
                            />
                        </InfoCard>

                        <InfoCard title="Total Projects" value={projectsCount}>
                            <RoundIcon
                                icon={PagesIcon}
                                iconColorClass="text-yellow-500 dark:text-yellow-100"
                                bgColorClass="bg-yellow-100 dark:bg-yellow-500"
                                className="mr-4"
                            />
                        </InfoCard>

                        <InfoCard title="Total Tickets" value={ticketsCount}>
                            <RoundIcon
                                icon={BugIcon}
                                iconColorClass="text-blue-500 dark:text-blue-100"
                                bgColorClass="bg-blue-100 dark:bg-blue-500"
                                className="mr-4"
                            />
                        </InfoCard>

                        <InfoCard title="High Priority Tickets" value={priority[2]}>
                            <RoundIcon
                                icon={DangerIcon}
                                iconColorClass="text-red-500 dark:text-red-100"
                                bgColorClass="bg-red-100 dark:bg-red-500"
                                className="mr-4"
                            />
                        </InfoCard>
                    </div>

                    <PageTitle>Charts</PageTitle>
                    <div className="grid gap-6 mb-8 md:grid-cols-2">

                        <ChartCard title="Ticket's Status">
                            <Pie
                                data={statusData}
                                options={{
                                    legend: {
                                        display: false,
                                    }
                                }}
                            />
                            <ChartLegend legends={statusLegends} />
                        </ChartCard>

                        <ChartCard title="Users">
                            <Doughnut {...roleOptions} />
                            <ChartLegend legends={roleLegends} />
                        </ChartCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home