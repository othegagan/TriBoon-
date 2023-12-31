import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'
import { UserAuth } from '../../context/AuthContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Button } from '@windmill/react-ui'
import { SendIcon } from '../../icons'

const SendMessage = ({ scroll }) => {
    const [input, setInput] = useState('');
    const { user, userDetails } = UserAuth();
    const [uDetails, setUDetails] = useState();

    useEffect(() => {
        if (user['uid'] === undefined) {
        } else {
            setUDetails(userDetails)
        }
    }, [userDetails, user])

    const sendMessage = async (e) => {
        e.preventDefault()
        if (input === '') {
            alert('Please enter a valid message')
            return
        }
        // const { uid, displayName , photoURL} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: uDetails['FirstName'],
            email : uDetails['email'],
            timestamp: serverTimestamp()
        })
        setInput('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 w-full">
                <form onSubmit={sendMessage} className='flex-row flex w-full'>
                    <textarea
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="flex items-center w-full rounded px-3  text-sm base:block focus:outline-none dark:text-gray-300 form-input active:focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 h-10"
                        type="text" placeholder="Type a message" />

                    <Button iconRight={SendIcon} type='submit' aria-label="Send" className="ml-4 max-h-10"> Send </Button>
                </form>
            </div>
        </>
    );
};

export default SendMessage;
