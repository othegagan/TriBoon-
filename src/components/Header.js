import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { UserAuth } from "../context/AuthContext";

import {
    MoonIcon,
    SunIcon,
    // BellIcon,
    MenuIcon,
    OutlinePersonIcon,
    OutlineCogIcon,
    // OutlineLogoutIcon,
} from "../icons";
// import {Badge, Input,} from '@windmill/react-ui'
import { Dropdown, DropdownItem, WindmillContext } from "@windmill/react-ui";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";



const Header = () => {
    const { user } = UserAuth();
    const [uDetails, setUDetails] = useState();

    useEffect(()=>{
        if (user['uid'] === undefined) {
        } else {
            const q = query(collection(db, 'admin'), where("uid", "==", user['uid']))
            var data;
            onSnapshot(q,
                (snapShot) => {
                    let list = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    data = list[0]
                    // console.log(data);
                    setUDetails(data)
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    },[user])

    const { mode, toggleMode } = useContext(WindmillContext);
    const { toggleSidebar } = useContext(SidebarContext);

    // const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // function handleNotificationsClick() {
    //     setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
    // }

    function handleProfileClick() {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }


    return (
        <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
            <div className=" flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                {/* <!-- Mobile hamburger --> */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <MenuIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* <!-- Search input --> */}
                <div className="flex  lg:mr-32">
                    <div className="relative w-full   max-w-xl mr-6 focus-within:text-purple-500">
                    </div>
                </div>

                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* <!-- Theme toggler --> */}
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none focus:shadow-outline-purple"
                            onClick={toggleMode}
                            aria-label="Toggle color mode"
                        >
                            {mode === "dark" ? (
                                <SunIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            ) : (
                                <MoonIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </li>

                    {/* <!-- Notifications menu --> */}
                    {/* <li className="relative">
                        <button
                            className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                            onClick={handleNotificationsClick}
                            aria-label="Notifications"
                            aria-haspopup="true"
                        >
                            <BellIcon className="w-5 h-5" aria-hidden="true" />
                            <span
                                aria-hidden="true"
                                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                            ></span>
                        </button>

                        <Dropdown align="right"
                            isOpen={isNotificationsMenuOpen}
                            onClose={() => setIsNotificationsMenuOpen(false)}>

                            <DropdownItem tag="a" href="#" className="justify-between">
                                <span>Messages</span>
                                <Badge type="danger">13</Badge>
                            </DropdownItem>

                            <DropdownItem tag="a" href="#" className="justify-between">
                                <span>Sales</span>
                                <Badge type="danger">2</Badge>
                            </DropdownItem>

                            <DropdownItem onClick={() => alert('Alerts!')}>
                                <span>Alerts</span>
                            </DropdownItem>
                        </Dropdown>
                    </li> */}

                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <button
                            className="rounded-full focus:shadow-outline-purple focus:outline-none pl-2 pr-2 pt-1 pb-1 flex bg-purple-600 items-center"
                            onClick={handleProfileClick}
                            aria-label="Account"
                            aria-haspopup="true"
                            style={{ scale: 2.7 }}
                        >
                            {user["photoURL"] ? (
                                <img
                                    className="align-middle w-5 h-5 mr-2 rounded-full "
                                    src={user["photoURL"]}
                                    alt="profile pic"
                                />
                            ) : (
                                <img
                                    className="align-middle w-5 h-5 mr-2 rounded-full "
                                    src="https://firebasestorage.googleapis.com/v0/b/projecttackingsystem.appspot.com/o/purple_user_iconsvg.svg?alt=media&token=9da0f557-a5ea-4592-97a9-ce598e927c4a"
                                    alt="profile pic"
                                />
                            )}


                            {uDetails === undefined ? (
                                <span className="text-white text-base">
                                    {""}
                                </span>
                            ) : (
                                <span className="text-white text-base">
                                    {uDetails['FirstName']}
                                </span>
                            )}
                        </button>
                        <Dropdown
                            align="right"
                            isOpen={isProfileMenuOpen}
                            onClose={() => setIsProfileMenuOpen(false)}
                        >
                            <DropdownItem tag="a" href="#">
                                <OutlinePersonIcon
                                    className="w-4 h-4 mr-3"
                                    aria-hidden="true"
                                />
                                <span>Profile</span>
                            </DropdownItem>
                            <DropdownItem tag="a" href="#">
                                <OutlineCogIcon
                                    className="w-4 h-4 mr-3"
                                    aria-hidden="true"
                                />
                                <span>Change password</span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
