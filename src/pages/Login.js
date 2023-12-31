import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Input, Label } from '@windmill/react-ui'
import Navbar from '../components/Navbar';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/home')
        } catch (err) {
            setPassword('')
            setError(err.message.replace(/Firebase:/g, '').replace("auth/", ""));
            setPassword('')

        }
    };

    return (
        <>
            <div className='h-screen bg-gray-50 dark:bg-gray-900'>
                <Navbar active="signup" />
                <div className="flex px-6  mt-12 mb-10 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img
                                    aria-hidden="true"
                                    className="object-cover w-full h-full dark:hidden"
                                    src={ImageLight}
                                    alt="light"
                                />
                                <img
                                    aria-hidden="true"
                                    className="hidden object-cover w-full h-full dark:block"
                                    src={ImageDark}
                                    alt="dark"
                                />
                            </div>
                            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 dark:text-gray-200">
                                <div className="w-full">
                                    <div className="mb-6 text-center">
                                        <p>Welcome back!  <br /><span className="mb-4 ml-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login to your account</span></p>
                                    </div>

                                    {error &&
                                        <div className="flex flex-row items-center mb-5 bg-red-200 border-b-2 border-red-300 rounded alert">
                                            <div className="ml-4 alert-content">
                                                <div className="p-3 text-xs font-bold text-red-600 alert-description">
                                                    {error}
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <form onSubmit={handleSubmit}>
                                        <Label>Email</Label>
                                        <Input className="mt-1" placeholder="yourname@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />

                                        <Label className="mt-4">Password</Label>
                                        <Input className="mt-1" placeholder="***************" type="password" onChange={(e) => setPassword(e.target.value)} />

                                        <button className="items-center bg-purple-600 text-base text-white w-full pt-2 pb-2 rounded-lg justify-center cursor-pointer leading-5 transition-colors font-medium  active:focus:border-purple-400 my-4">Login</button>

                                    </form>

                                    <p className="">
                                        <Link className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" to="/forgot-password" > Forgot your password? </Link>
                                    </p>
                                    <p className="mt-1 text-base">Not a user yet?
                                        <Link className="text-base font-medium text-purple-600 dark:text-purple-400 hover:underline" to="/signup" > Create an account </Link> here
                                    </p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
