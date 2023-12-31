import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { SidebarContext } from "../../context/SidebarContext";
import PageTitle from "../../components/Typography/PageTitle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ViewUserInfo = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);

    const [data, setData] = useState({});

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


    console.log(data);


    return (
        <>
            <div
                className={`flex h-full min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                    }`}
            >
                <Sidebar active="users" />
                <div className="flex h-full flex-col flex-1 w-full">
                    <Header />
                    <div className="pl-6 pr-6 dark:bg-gray-900 bg-gray-50 pb-6">
                        <div className="flex justify-between items-center">
                            <PageTitle>{props.title}</PageTitle>
                        </div>

                        <div className="mt-5 md:mt-0 md:col-span-2 dark:bg-gray-800">
                            <div className="shadow overflow-hidden sm:rounded-md dark:bg-gray-800">
                                <div className="px-4 py-5 bg-white dark:bg-gray-800  sm:p-6 justify-center">
                                    <div className="flex flex-wrap -mx-2 mb-8">
                                        <div className="w-full md:w-1/4 lg:w-1/4 px-2 mb-4 ">
                                            <img
                                                className="h-64 md:w-64 sm:w-auto :mb-10 md:mr-32 justify-center object-cover rounded-lg"
                                                src={data.img}
                                                alt={"dpuser"}
                                            />
                                        </div>

                                        <div className="w-full md:w-3/4 lg:w-3/4 px-2 mb-4 ">
                                            <div className=" flex-col">


                                                <div className="flex flex-row">
                                                    <div className="flex flex-col text-base  text-gray-700  dark:text-white mr-6">
                                                        <div className="mb-3"> Full name    </div>
                                                        <div className="mb-3"> Email ID     </div>
                                                        <div className="mb-3"> Phone        </div>
                                                        <div className="mb-3"> Role         </div>
                                                        <div className="mb-3"> UNQ ID       </div>
                                                        <div className="mb-3"> Location     </div>
                                                        <div className="mb-3"> Joined Date  </div>
                                                    </div>

                                                    <div className="flex flex-col  text-base font-bold text-gray-700  dark:text-white">
                                                        <div className="mb-3"> {data.displayName}</div>
                                                        <div className="mb-3"> {data.email}     </div>
                                                        <div className="mb-3"> {data.phone}        </div>
                                                        <div className="mb-3"> {data.role}         </div>
                                                        <div className="mb-3"> {data.unique_id}       </div>
                                                        <div className="mb-3"> {data.city + ", " + data.state}     </div>
                                                        <div className="mb-3"> {data.joinedDate}  </div>
                                                    </div>
                                                </div>


                                                <Link to="/users">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center py-2 px-4 mt-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                    >Back
                                                    </button>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>









                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewUserInfo;
