import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { SidebarContext } from '../../context/SidebarContext'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { Card, CardBody } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { EyeIcon, TrashIcon, EditIcon } from '../../icons'


import { db } from "../../firebase";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";




const Projects = () => {

    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [ID, setID] = useState("")

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list)
            },
            (error) => {
                setError(error)
            }
        );

        return () => {
            unsub();
        };
    }, []);



    const handleDelete = async (id) => {
        try {
            closeModal()
            await deleteDoc(doc(db, "projects", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
            <Sidebar active="projects" />
            <div className="flex flex-col flex-1 w-full h-full">
                <Header />
                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6 h-auto">
                    <div className="flex justify-between items-center">
                        <PageTitle>Projects</PageTitle>
                        <span>
                            <Link to="/createnewproject" className="items-center bg-purple-600 text-base text-white w-32
                                        pt-2 pb-2 rounded-lg justify-center cursor-pointer leading-5 transition-colors font-medium  active:focus:border-purple-400 pl-5 pr-5"  >Add Project</Link>
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

                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                        {data.map((project, i) => (
                            <Card key={i} className="shadow-lg h-auto">
                                <CardBody>
                                    <Link to={`/viewprojectdetails/${project.id}`} >
                                        <div className="flex justify-between">
                                            <p className="mb-3 font-semibold text-gray-600 dark:text-gray-300 capitalize">{project.projectName}  </p>
                                            <p className='text-gray-600  dark:text-gray-400 capitalize'>{project.clientName}</p>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 capitalize">
                                            {project.description}
                                        </p>
                                    </Link>
                                    <p className='dark:text-white text-xs mt-3'>Created On : {project.CreatedOn}</p>

                                    <div className="flex justify-between mt-3 items-center">

                                        <div className="flex justify-between  py-4 sm:py-0 px-0 sm:px-0  dark:text-gray-100">
                                            <>
                                                <div className="flex md:w-24 xs:mr-5 flex-col items-center">
                                                    <h5 className="font-body font-bold text-desaturatedBlue text-lg">{project.tickets || 0}</h5>
                                                    <p className="font-body text-darkGray text-xs tracking-widest sm:text-xs mt-1">
                                                        {"TICKETS"}
                                                    </p>
                                                </div>
                                                <div className="flex md:w-24 xs:mr-5 flex-col items-center">
                                                    <h5 className="font-body font-bold text-desaturatedBlue text-lg">{project.assignees.length}</h5>
                                                    <p className="font-body text-darkGray text-xs tracking-widest mt-1">
                                                        {"ASSIGNES"}
                                                    </p>
                                                </div>
                                            </>
                                        </div>


                                        <div className="flex items-center space-x-4 ">
                                            <Link to={`/viewprojectdetails/${project.id}`} >
                                                <button size="icon" title='View' className="text-purple-600" aria-label="View" >
                                                    <EyeIcon className="w-5 h-5 " aria-hidden="true" />
                                                </button>
                                            </Link>

                                            <Link to={`/updateprojectdetails/${project.id}`} >
                                                <button title='Edit' size="icon" className='text-green-600' aria-label="Edit">
                                                    <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                </button>
                                            </Link>

                                            <button size="icon" aria-label="Delete" className='text-red-600' title='Delete' onClick={() => openModal(project.id)} >
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>



                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalHeader>Are you sure..!</ModalHeader>
                        <ModalBody>
                            Do you really want to delete this Project? This process cannot be undone.!

                        </ModalBody>
                        <ModalFooter>
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={closeModal}>Cancel</Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button onClick={() => { handleDelete(ID) }}>Delete Project</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" layout="outline" onClick={closeModal}>Cancel</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" onClick={() => { handleDelete(ID) }}>Delete Project</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Projects
