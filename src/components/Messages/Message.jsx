import React from 'react';
import { auth } from '../../firebase'
import { formatRelative } from 'date-fns';

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


const Message = ({ message }) => {

    return (
        <div>
            {
                message.email === auth.currentUser.email ?
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div className='flex flex-col'>
                    <p className="font-bold dark:text-gray-100 mt-1 text-sm mb-1 ml-auto">You</p>
                    <div className="bg-purple-600 text-white py-1 px-2 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{message.text}</p>
                    </div>
                            {message.timestamp?.seconds ? (
                                <span className="text-xs dark:text-gray-300 text-gray-800 leading-none mt-2">
                                    {formatDate(new Date(message.timestamp.seconds * 1000))}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                            {message.photo ?
                                <img src={message.photo} className="h-10 w-10 rounded-full" alt='user-avatar'/>
                                :
                                <img
                                    className="align-middle  h-10 w-10 rounded-full "
                                    src="https://firebasestorage.googleapis.com/v0/b/projecttackingsystem.appspot.com/o/purple_user_iconsvg.svg?alt=media&token=9da0f557-a5ea-4592-97a9-ce598e927c4a"
                                    alt="profile pic"
                                />
                            }
                        </div>
                    </div>
                    :
                    <div className="flex w-full mt-2 space-x-2 max-w-xs">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                            {message.photo ?
                                <img src={message.photo} className="h-10 w-10 rounded-full" alt='user-avatar'/>
                                :
                                <img
                                    className="align-middle  h-10 w-10 rounded-full "
                                    src="https://firebasestorage.googleapis.com/v0/b/projecttackingsystem.appspot.com/o/purple_user_iconsvg.svg?alt=media&token=9da0f557-a5ea-4592-97a9-ce598e927c4a"
                                    alt="profile pic"
                                />
                            }
                        </div>
                        <div className='flex flex-col'>
                            <p className="font-bold dark:text-gray-100 mt-1 text-sm mb-1 mr-auto">{message.name}</p>
                            <div className="bg-gray-600 text-white py-1 px-2 rounded-l-lg rounded-br-lg">
                                <p className="text-base">{message.text}</p>
                            </div>
                            {message.timestamp?.seconds ? (
                                <span className="text-xs dark:text-gray-300 text-gray-800 leading-none mt-2">
                                    {formatDate(new Date(message.timestamp.seconds * 1000))}
                                </span>
                            ) : null}
                        </div>
                    </div>
            }
        </div>
    );
};

export default Message;
