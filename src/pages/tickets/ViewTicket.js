import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { SidebarContext } from "../../context/SidebarContext";
import PageTitle from "../../components/Typography/PageTitle";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { GreenTickIcon } from "../../icons";
import { formatRelative } from 'date-fns';


import { Modal, ModalHeader, ModalFooter, Button, Input, Textarea } from '@windmill/react-ui'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

const ViewTicket = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        window.location.href = "/tickets"
    }
    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [per, setPerc] = useState(null);
    const [error, setError] = useState("");
    const [uploadStatus, setUploadStaus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)


    let proj = useParams();
    const { id } = proj;

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "tickets", id);
            const docSnap = await getDoc(docRef);
            const oldData = docSnap.data();
            setData(oldData);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadStaus("Photo Upload status " + progress + "% done");
                    setPerc(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setData((prev) => ({ ...prev, img: downloadURL }));
                        }
                    );
                }
            );
        };
        file && uploadFile();
    }, [file]);


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    };

    // console.log(data);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "tickets", id), {
                ...data,
                modifiedDate: serverTimestamp(),
            });
            openModal()
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div
                className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                    }`}
            >
                <Sidebar active="tickets" />

                <div className="flex h-full flex-col flex-1 w-full">
                    <Header />
                    <div className="pl-6 pr-6 dark:bg-gray-900 bg-gray-50 pb-6 h-auto">
                        <div className="flex justify-between items-center">
                            <PageTitle>{props.title}</PageTitle>
                            <p>Modifed Date : {
                                data.modifiedDate === undefined ? '' :
                                    formatDate(new Date(data.modifiedDate.seconds * 1000))}</p>
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

                        <div className="mt-10 md:mt-0 md:col-span-2 dark:bg-gray-800">
                            <form onSubmit={handleAdd}>
                                <div className="shadow overflow-hidden sm:rounded-md dark:bg-gray-800">
                                    <div className="px-4 py-5 bg-white dark:bg-gray-800  sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Title
                                                </label>
                                                <Input type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Enter ticket title"
                                                    value={data.title}
                                                    onChange={handleInput} required />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Description
                                                </label>
                                                <Textarea type="text"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Give some description about the ticket"
                                                    value={data.description}
                                                    onChange={handleInput} required />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Project
                                                </label>
                                                <Input type="text"
                                                    name="city"
                                                    id="city"
                                                    disabled
                                                    // eslint-disable-next-line
                                                    value={data.projectName || ''} required />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Assign To
                                                </label>
                                                <Input type="text"
                                                    name="city"
                                                    id="city"
                                                    disabled
                                                    // eslint-disable-next-line
                                                    value={data.assignedTo || ''} required />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Ticket Priority
                                                </label>
                                                <select
                                                    id="priority"
                                                    name="priority"
                                                    onChange={handleInput}
                                                    required
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm base:block  text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 "
                                                >
                                                    {(data.priority || "") === 'Low' ? <option value="Low" selected  >Low</option> : <option value="Low">Low</option>}
                                                    {(data.priority || "") === 'Medium' ? <option value="Medium" selected>Medium</option> : <option value="Medium">Medium</option>}
                                                    {(data.priority || "") === 'High' ? <option value="High" selected>High</option> : <option value="High">High</option>}
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Ticket Status
                                                </label>
                                                <select
                                                    id="status"
                                                    name="status"
                                                    onChange={handleInput}
                                                    required
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm base:block  text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 "
                                                >
                                                    {(data.status || "") === 'To Do' ? <option value="To Do" selected  >To Do</option> : <option value="To Do">To Do</option>}
                                                    {(data.status || "") === 'In Progress' ? <option value="In Progress" selected>In Progress</option> : <option value="In Progress">In Progress</option>}
                                                    {(data.status || "") === 'Done' ? <option value="Done" selected>Done</option> : <option value="Done">Done</option>}
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Ticket Type
                                                </label>
                                                <Input type="text"
                                                    name="type"
                                                    id="type"
                                                    disabled
                                                    // eslint-disable-next-line
                                                    value={data.type || ''} required />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                    Reported / Requested By
                                                </label>
                                                <Input type="text"
                                                    name="by"
                                                    id="by"
                                                    placeholder="Enter name"
                                                    value={data.by}
                                                    onChange={handleInput}  />
                                            </div>

                                        </div>

                                        <div className="flex flex-row mt-10 justify-between">

                                            {
                                                data.img &&
                                                <div className="w-2/5 cursor-pointer hover:scale-150" >
                                                    <img src={data.img} className="cursor-pointer" alt="ticket_photo" />
                                                </div>
                                            }

                                            {/* image */}
                                            <div className="flex flex-row  xs:flex-col">

                                                <p className="text-sm  dark:text-white">
                                                    Update a photo of ticket
                                                </p> <br />

                                                <label className="block dark:text-white ml-5">
                                                    <span className="sr-only">
                                                        Choose profile photo
                                                    </span>
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        onChange={(e) => setFile(e.target.files[0])}
                                                        className="block  text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border file:border-solid
                                                file:text-sm file:font-semibold
                                                file:bg-violet-50 file:text-violet-700
                                                hover:file:bg-violet-100"
                                                    />
                                                </label>
                                                <p className="text-sm dark:text-white mt-5">{uploadStatus}</p>
                                            </div>

                                            {/* buttons */}
                                            <div className="px-4 my-10  dark:bg-gray-800  text-right sm:px-6">
                                                <Button className="mr-5 " layout="outline" tag={Link} to="/tickets">
                                                    Cancel
                                                </Button>
                                                {per !== null && per < 100 ? (
                                                    <button
                                                        disabled
                                                        type="submit"
                                                        className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent opacity-50 cursor-wait"
                                                    >Update Ticket
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                    >Update Ticket
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="flex flex-row items-center justify-left">
                                <ModalHeader> <GreenTickIcon /> </ModalHeader>
                                <div className='ml-6 text-sm text-gray-700 dark:text-gray-100'>
                                    Ticket details has been updated successfully..!
                                </div>
                            </div>
                            <ModalFooter>

                                <div className="hidden sm:block">
                                    <Button onClick={() => { window.location.href = "/projects" }}>OK</Button>
                                </div>

                                <div className="block w-full sm:hidden">
                                    <Button block size="large" onClick={() => { window.location.href = "/projects" }}>OK</Button>
                                </div>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewTicket;
