import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { HomeIcon, PagesIcon, Calendar, PeopleIcon, OutlineLogoutIcon, ChatIcon, BugIcon } from "../../icons";
import { Button } from "@windmill/react-ui";

const SidebarContent = ({ active }) => {
    const { logout } = UserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="py-4  text-gray-500 dark:text-gray-400 h-56">
            <div className="ml-6 mb-8 text-2xl font-bold  text-gray-800 dark:text-gray-200" >
                <span className="text-purple-600 mr-0 p-0">Tri</span>  Boon
            </div>
            {/* Dashboard */}
            <ul>
                <li className="relative px-6 py-3" key="Dashboard">
                    <NavLink
                        to="/home"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "dashboard" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <HomeIcon />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Dashboard
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <HomeIcon />
                                </div>
                                <span className="ml-4 ">Dashboard</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>

            {/* projects */}
            <ul>
                <li className="relative px-6 py-3" key="projects">
                    <NavLink
                        to="/projects"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "projects" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <PagesIcon />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Projects
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <PagesIcon />
                                </div>
                                <span className="ml-4 ">Projects</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>

            {/* scheduler */}
            <ul>
                <li className="relative px-6 py-3" key="scheduler">
                    <NavLink
                        to="/scheduler"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "scheduler" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <Calendar />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Scheduler
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <Calendar />
                                </div>
                                <span className="ml-4 ">Scheduler</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>

            {/* messages */}
            <ul>
                <li className="relative px-6 py-3" key="messages">
                    <NavLink
                        to="/messages"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "messages" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <ChatIcon />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Messages
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <ChatIcon />
                                </div>
                                <span className="ml-4 ">Messages</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>

            {/* Users */}
            <ul>
                <li className="relative px-6 py-3" key="Users">
                    <NavLink
                        to="/users"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "users" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <PeopleIcon />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Users
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <PeopleIcon />
                                </div>
                                <span className="ml-4 ">Users</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>

            {/* Tickets */}
            <ul>
                <li className="relative px-6 py-3" key="Tickets">
                    <NavLink
                        to="/tickets"
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        {active === "tickets" ? (
                            <>
                                {" "}
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>{" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <BugIcon />
                                </div>
                                <span className="ml-4 text-purple-700 dark:text-gray-100 font-semibold text-lg">
                                    Tickets
                                </span>
                            </>
                        ) : (
                            <>
                                {" "}
                                <div className="w-5 h-5" aria-hidden="true">
                                    <BugIcon />
                                </div>
                                <span className="ml-4 ">Tickets</span>
                            </>
                        )}
                    </NavLink>
                </li>
            </ul>


            <div className="px-6 my-6">
                <Button onClick={handleLogout}>
                    <div className="mr-2 w-5 h-5"><OutlineLogoutIcon /></div>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default SidebarContent;
