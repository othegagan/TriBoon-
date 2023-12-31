import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { SidebarContext } from "../../context/SidebarContext";
import PageTitle from "../../components/Typography/PageTitle";
import { UserAuth } from "../../context/AuthContext";
import { collection, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Select from "react-select";
import { GreenTickIcon } from "../../icons";
import { Modal, ModalHeader, ModalFooter, Button } from '@windmill/react-ui'


const UpdateProjectDetails = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        window.location.href = "/projects"
    }
    const { formatedDate } = UserAuth();
    let currentDate = formatedDate();

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);

    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [userNameList] = useState([]);
    const [assignees, setSelectedValue] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)


    let currentUser = useParams();
    const { id } = currentUser;

    useEffect(() => {
        const getUserNames = onSnapshot(
            collection(db, "users"),
            (snapShot) => {
                snapShot.docs.forEach((doc) => {
                    userNameList.push({
                        label: doc.data().displayName + "  (" + doc.data().unique_id + ")",
                        value: doc.data().displayName + "  (" + doc.data().unique_id + ")"
                    });
                });
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            getUserNames();
        };
        // eslint-disable-next-line
    }, []);

    const [users, setUsers] = useState([]);



    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "projects", id);
            const docSnap = await getDoc(docRef);
            setUsers(docSnap.data().assignees)

            const oldData = docSnap.data();
            setData(oldData);
            // if (docSnap.exists()) {
            //     console.log("old Document data:", oldData);
            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            // }
        }
        fetchData();
    }, [id]);


    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
        data.assignees = assignees
        // console.log(assignees);
    };

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        data.assignees = assignees;
        setData({ ...data, [id]: value });
        // console.log(data)
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "projects", id), {
                ...data,
                "modifedDate": currentDate
            });
            openModal()
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div
                className={`flex h-auto bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                    }`}
            >
                <Sidebar active="projects" />
                <div className="flex flex-col flex-1 w-full">
                    <Header />
                    <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                        <div className="flex justify-between items-center">
                            <PageTitle>{props.title}</PageTitle>
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
                        <div className="mt-5 md:mt-0 md:col-span-2 dark:bg-gray-800">
                            <form onSubmit={handleUpdate}>
                                <div className="shadow overflow-hidden sm:rounded-md dark:bg-gray-800 pb-6">
                                    <div className="px-4 py-5 bg-white dark:bg-gray-800  sm:p-6">
                                        <div className="flex flex-col justify-center md:pl-20 md:pr-20 ">
                                            <div className="mb-4">
                                                <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                    Project Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="projectName"
                                                    id="projectName"
                                                    autoCapitalize="words"
                                                    onChange={handleInput}
                                                    value={data.projectName}
                                                    required
                                                    className="  base:block w-full text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                    Owner/Client Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="clientName"
                                                    id="clientName"
                                                    autoCapitalize="words"
                                                    onChange={handleInput}
                                                    value={data.clientName}
                                                    required
                                                    className="  base:block w-full text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                                                />
                                            </div>

                                            <div className="grid grid-cols-6 gap-6 mb-4">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="mail"
                                                        name="email"
                                                        id="email"
                                                        value={data.email}
                                                        onChange={handleInput}
                                                        required
                                                        className="w-full  base:block  text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={data.phone}
                                                        id="phone"
                                                        onChange={handleInput}
                                                        required
                                                        className="w-full   base:block text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                    Assignes
                                                </label>
                                                <p className="dark:text-white text-sm ">Already Assigned to  :  <span>{users.map((u, i) => <span className="mr-2 capitalize" key={i}>{u} | </span>)}</span></p>

                                                <Select
                                                    className="mt-1 block w-full   bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base base:block  text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-gray-900 font-medium focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
                                                    placeholder="Select Assignes"
                                                    id="assignees"
                                                    value={userNameList.filter(
                                                        (obj) =>
                                                            assignees.includes(
                                                                obj.value
                                                            )
                                                    )} // set selected values
                                                    options={userNameList} // set list of the data
                                                    onChange={handleChange} // assign onChange function
                                                    isMulti
                                                    required
                                                    isClearable
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                    Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    name="description"
                                                    autoCapitalize="words"
                                                    value={data.description}
                                                    id="description"
                                                    rows={5}
                                                    onChange={handleInput}
                                                    required
                                                    className="  base:block w-full text-base focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="block text-base font-medium text-gray-700  dark:text-white">
                                                    Create Date :{" "} {data.CreatedOn}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800  text-right sm:px-6">
                                        <button
                                            type="submit"
                                            onClick={handleChange}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        >
                                            {props.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="flex flex-row items-center justify-left">
                                <ModalHeader> <GreenTickIcon /> </ModalHeader>
                                <div className='ml-6 text-sm text-gray-700 dark:text-gray-100'>
                                    {data['projectName']} Project Details updated successfully.
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

export default UpdateProjectDetails;
