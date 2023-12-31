import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { SidebarContext } from "../../context/SidebarContext";
import PageTitle from "../../components/Typography/PageTitle";
import { serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GreenTickIcon } from "../../icons";
import { Modal, ModalHeader, ModalFooter, Button, Input } from '@windmill/react-ui'



const UpdateUserInfo = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
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


    let currentUser = useParams();
    const { id } = currentUser;

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            const oldData = docSnap.data();
            setData(oldData);
            if (docSnap.exists()) {
                console.log("Document data:", oldData);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
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


    console.log(data);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value, "password": data.password, "unique_id": data.unique_id });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "users", id), {
                ...data,
                timeStamp: serverTimestamp(),
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
                <Sidebar active="users" />
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
                                <div className="shadow overflow-hidden sm:rounded-md dark:bg-gray-800">
                                    <div className="px-4 py-5 bg-white dark:bg-gray-800  sm:p-6">
                                        <p className="text-sm dark:text-white">
                                            Choose profile photo
                                        </p> <br />
                                        <div className="flex items-center justify-between space-x-6 mb-2">
                                            <div className=" flex flex-row items-center">
                                                <div className="shrink-1">
                                                    {file ?
                                                        <img
                                                            className="h-16 w-16 object-cover rounded-full"
                                                            src={URL.createObjectURL(file)}
                                                            alt="user dp "
                                                        />
                                                        :
                                                        <img
                                                            className="h-16 w-16 object-cover rounded-full"
                                                            src={data.img}
                                                            alt="user dp "
                                                        />
                                                    }
                                                </div>
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
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    UNQ ID
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="role"
                                                    id="role"
                                                    disabled
                                                    value={data.unique_id}
                                                    className="  base:block w-full text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1 bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <p className="text-sm dark:text-white mb-5">{uploadStatus}</p>

                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    Full name
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="displayName"
                                                    id="displayName"
                                                    onChange={handleInput}
                                                    value={data.displayName}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    Phone Number
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    onChange={handleInput}
                                                    value={data.phone}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    Email address
                                                </label>
                                                <Input
                                                    type="mail"
                                                    name="email"
                                                    id="email"
                                                    disabled
                                                    value={data.email}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    Role
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="role"
                                                    id="role"
                                                    disabled
                                                    value={data.role}
                                                />
                                            </div>



                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    City
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    onChange={handleInput}
                                                    value={data.city}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700  dark:text-white">
                                                    State / Province
                                                </label>
                                                <Input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    onChange={handleInput}
                                                    value={data.state}
                                                />
                                            </div>


                                        </div>
                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800  text-right sm:px-6">

                                        <Button className="mr-5 " layout="outline" tag={Link} to="/users">
                                            Cancel
                                        </Button>

                                        {per !== null && per < 100 ? (
                                            <button
                                                disabled
                                                type="submit"
                                                className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent opacity-50 cursor-wait"
                                            >{props.buttonText}
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                            >{props.buttonText}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="flex flex-row items-center justify-left">
                                <ModalHeader> <GreenTickIcon /> </ModalHeader>
                                <div className='ml-6 text-sm text-gray-700 dark:text-gray-100'>
                                    User Details updated successfully.
                                </div>
                            </div>
                            <ModalFooter>

                                <div className="hidden sm:block">
                                    <Button onClick={() => { window.location.href = "/users" }}>OK</Button>
                                </div>

                                <div className="block w-full sm:hidden">
                                    <Button block size="large" onClick={() => { window.location.href = "/users" }}>OK</Button>
                                </div>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateUserInfo;
