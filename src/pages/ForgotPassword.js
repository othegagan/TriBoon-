import React, { useState } from 'react'
import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label } from '@windmill/react-ui'
import { auth} from "../firebase";
import {sendPasswordResetEmail} from 'firebase/auth'
import { Link } from 'react-router-dom';


function ForgotPassword() {


    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("A Reset Password Link as been sent to ", email)
            setEmail("");
        } catch (err) {
            setError(err.message.replace(/Firebase:/g, '').replace("auth/", ""));
        }
    };


    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src={ImageLight}
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src={ImageDark}
                            alt="Office"
                        />
                    </div>
                    <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Forgot password
                            </h1>
                            { success &&
                                <div className="alert flex flex-row items-center bg-green-200 mb-5  rounded border-b-2 border-green-300">
                                    <div className="alert-content ml-4">
                                        <div className="alert-description p-3 font-medium text-xs text-green-600">
                                            {success}
                                        </div>
                                    </div>
                                </div>
                            }

                            {error &&
                                <div className="alert flex flex-row items-center bg-red-200 mb-5  rounded border-b-2 border-red-300">
                                    <div className="alert-content ml-4">
                                        <div className="alert-description p-3 font-medium text-xs text-red-600">
                                            {error}
                                        </div>
                                    </div>
                                </div>
                            }
                            <form onSubmit={handleSubmit}>

                                <Label>Email</Label>
                                <input onChange={(e) => setEmail(e.target.value)} className="  base:block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5
                        active:focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="email" placeholder="yourname@gmail.com" required />

                                <button className="items-center bg-purple-600 text-base text-white w-full
                                pt-2 pb-2 rounded-lg justify-center cursor-pointer leading-5 transition-colors font-medium  active:focus:border-purple-400 mt-4"  >Send Link</button>
                            </form>
                            <p className="mt-4">
                                <Link className="text-sm underline font-medium text-purple-600 dark:text-purple hover:underline" to="/signin" > Go back to Login </Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
