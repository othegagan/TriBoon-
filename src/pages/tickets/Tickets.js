import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { SidebarContext } from '../../context/SidebarContext'
import PageTitle from '../../components/Typography/PageTitle'
import { formatRelative } from 'date-fns';
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Pagination,
} from '@windmill/react-ui'
import { EyeIcon } from '../../icons'

import { UserAuth } from '../../context/AuthContext'

import Badge from '../../components/Badge'


const formatDate = date => {
    let formattedDate = '';
    if (date) {
        // Convert the date in words relative to the current date
        formattedDate = formatRelative(date, new Date());
        // Uppercase the first letter
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};


const Tickets = (props) => {

    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()
    const { dbtickets } = UserAuth();


    useEffect(() => {
        closeSidebar()
        // eslint-disable-next-line
    }, [location])


    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);


    // pagination setup
    const resultsPerPage = 10
    const totalResults = dbtickets.length === undefined ? 0 : dbtickets.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }


    useEffect(() => {
        setData(dbtickets.slice((page - 1) * resultsPerPage, page * resultsPerPage))
        // eslint-disable-next-line
    }, [page, dbtickets])

    // console.log(usersData)

    return (
        <div className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
            <Sidebar active="tickets" />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <div className="flex justify-between items-center">
                        <PageTitle>{props.title}</PageTitle>
                    </div>
                    {/* <SectionTitle>Table with actions</SectionTitle> */}
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader className="dark:text-gray-200">
                                <tr>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Assigned To</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Modifed Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {data.map((ticket, i) => (
                                    <TableRow key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">

                                        <TableCell>
                                            <div>
                                                <Link to={`/viewticket/${ticket.id}`} >
                                                    <p className="text-base text-gray-600 dark:text-gray-200 capitalize">{ticket.title}</p>
                                                </Link>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-base text-gray-600 dark:text-gray-200">{ticket.assignedTo}</p>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">{ticket.type}</p>
                                        </TableCell>

                                        <TableCell>
                                            <Badge type={ticket.priority}></Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge type={ticket.status}></Badge>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">
                                                {
                                                    ticket.modifiedDate === undefined ?
                                                        formatDate(new Date(ticket.createdDate.seconds * 1000))
                                                        :
                                                        formatDate(new Date(ticket.modifiedDate.seconds * 1000))
                                                }
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <Link to={`/viewticket/${ticket.id}`} >
                                                    <button size="icon" title='View' className="text-purple-600" aria-label="View" >
                                                        <EyeIcon className="w-5 h-5 " aria-hidden="true" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TableFooter>
                            <Pagination
                                totalResults={totalResults}
                                resultsPerPage={resultsPerPage}
                                label="Table navigation"
                                onChange={onPageChange}
                            />
                        </TableFooter>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default Tickets
