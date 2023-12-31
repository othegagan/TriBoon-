import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { SidebarContext } from '../../context/SidebarContext'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
// import SectionTitle from '../components/Typography/SectionTitle'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Avatar,
    Pagination,
} from '@windmill/react-ui'
import { TrashIcon, EditIcon, EyeIcon } from '../../icons'

import { UserAuth } from '../../context/AuthContext'

import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";




const Users = () => {

    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()
    const { usersData } = UserAuth();


    useEffect(() => {
        closeSidebar()
        // eslint-disable-next-line
    }, [location])


    function openModal(id) {
        setIsModalOpen(true)
        setID(id)
    }

    function closeModal() {
        setIsModalOpen(false)
    }


    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ID, setID] = useState("")


    // pagination setup
    const resultsPerPage = 10
    const totalResults = usersData.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }


    useEffect(() => {
        setData(usersData.slice((page - 1) * resultsPerPage, page * resultsPerPage))
        // eslint-disable-next-line
    }, [page, usersData])

    // console.log(usersData)


    const handleDelete = async (id) => {
        try {
            closeModal()
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
            <Sidebar active="users" />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <div className="flex justify-between items-center">
                        <PageTitle>Users</PageTitle>
                        <span>
                            <Link to="/addnewuser" className="items-center bg-purple-600 text-base text-white w-32
                                pt-2 pb-2 rounded-lg justify-center cursor-pointer leading-5 transition-colors font-medium  active:focus:border-purple-400 pl-5 pr-5"  >Add User</Link>
                        </span>
                    </div>
                    {error && (
                        <div className="alert flex flex-row items-center bg-red-200 mb-5  rounded border-b-2 border-red-300">
                            <div className="alert-content ml-4">
                                <div className="alert-description p-3 font-medium text-xs text-red-600">
                                    {error}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <SectionTitle>Table with actions</SectionTitle> */}
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader className="dark:text-gray-200">
                                <tr>
                                    <TableCell>Name</TableCell>
                                    <TableCell>UNQ ID</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {data.map((user, i) => (
                                    <TableRow key={i} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <TableCell>
                                            <div className="flex items-center text-sm">
                                                <Avatar className="hidden mr-3 md:block" src={user.img} alt="User avatar" />
                                                <div>
                                                    <p className="font-semibold dark:text-gray-200 text-base">{user.displayName}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-base text-gray-600 dark:text-gray-200">{user.unique_id}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-base text-gray-600 dark:text-gray-200">{user.role}</p>
                                            {/* <Badge type={user.status}>{user.status}</Badge> */}
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-base text-gray-600 dark:text-gray-200">{user.email}</p>
                                            {/* <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span> */}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <Link to={`/viewuser/${user.id}`} >
                                                    <button size="icon" title='View' className="text-purple-600" aria-label="View" >
                                                        <EyeIcon className="w-5 h-5 " aria-hidden="true" />
                                                    </button>
                                                </Link>

                                                <Link to={`/updateuser/${user.id}`} >
                                                    <button title='Edit' size="icon" className='text-green-600' aria-label="Edit">
                                                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                    </button>
                                                </Link>

                                                <button size="icon" aria-label="Delete" className='text-red-600' title='Delete' onClick={() => openModal(user.id)} >
                                                    <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                </button>
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



                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalHeader>Are you sure..!</ModalHeader>
                        <ModalBody>
                            Do you really want to delete this user? This process cannot be undone.!

                        </ModalBody>
                        <ModalFooter>
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={closeModal}>Cancel</Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button onClick={() => { handleDelete(ID) }}>Delete User</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" layout="outline" onClick={closeModal}>Cancel</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" onClick={() => { handleDelete(ID) }}>Delete User</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Users
