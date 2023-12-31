import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import Message from '../components/Messages/Message';
import SendMessage from '../components/Messages/SendMessage';

const Messages = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);

    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div
            className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                }`}
        >
            <Sidebar active="messages" />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <div className=" md:flex md:flex-row justify-between items-center xs:flex-col xs:items-start">
                        <PageTitle>{props.title}</PageTitle>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800 ">
                        <div className="flex flex-col flex-grow w-full max-w-4xl  overflow-hidden">
                            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto shadow-lg">
                                {
                                    messages &&
                                    messages.map((message) => (
                                        <Message key={message.id} message={message} />
                                    ))
                                }
                            </div>
                            <SendMessage scroll={scroll} />
                            <span ref={scroll}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;






