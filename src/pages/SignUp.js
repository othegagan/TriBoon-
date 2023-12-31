import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, HelperText } from '@windmill/react-ui'
import Navbar from '../components/Navbar';




const SignUp = () => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { registerWithEmailAndPassword } = UserAuth();
    const navigate = useNavigate()


    // const { signInWithGoogle } = UserAuth();

    // const googleSignIn = async (e) => {
    //     e.preventDefault();
    //     setError('')
    //     try {
    //         await signInWithGoogle()
    //         navigate('/home')
    //     } catch (err) {
    //         setError(err.message.replace(/Firebase:/g, '').replace("auth/", ""));
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerWithEmailAndPassword(firstName, lastName, email, password);
            navigate('/home')
        } catch (err) {
            setError(err.message.replace(/Firebase:/g, '').replace("auth/", ""));
        }
    };

    return (

        <>
            <div className='h-screen bg-gray-50 dark:bg-gray-900'>
                <Navbar active="login" />
                <div className="flex px-6  mt-10 mb-10 bg-gray-50 dark:bg-gray-900">
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
                            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 dark:text-white" >
                                <div className="w-full">
                                    <div className="text-center mb-6">
                                        <p className="dark:text-gray-200">Hello there..!  <br /><span className="mb-4 ml-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Sign Up for your account</span></p>
                                    </div>

                                    {error &&
                                        <div className="alert flex flex-row items-center bg-red-200 mb-5  rounded border-b-2 border-red-300">
                                            <div className="alert-content ml-4">
                                                <div className="alert-description p-3 text-xs font-medium text-red-600">
                                                    {error}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <form onSubmit={handleSubmit}>

                                        <div className="grid grid-cols-6 gap-2 mb-3">
                                            <div className="col-span-6 sm:col-span-3">
                                                <Label>First Name</Label>

                                                <Input className="mt-1"
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    placeholder='John'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <Label>Last Name</Label>
                                                <Input className="mt-1" type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    placeholder='doe'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required />
                                            </div>
                                        </div>

                                        <Label>Email</Label>
                                        <Input className="mt-1" placeholder="yourname@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />


                                        <Label className="mt-4">  Password</Label>
                                        <Input className="mt-1" placeholder="***************" type="password" onChange={(e) => setPassword(e.target.value)} />
                                        <HelperText>Your password must be at least 6 characters long.</HelperText>

                                        <button className="items-center bg-purple-600 text-base text-white w-full
                                pt-2 pb-2 rounded-lg justify-center cursor-pointer leading-5 transition-colors font-medium  active:focus:border-purple-400 mt-4">Create Account</button>
                                    </form>

                                    <hr className="my-8" />

                                    {/* <Button block className="mb-4" layout="link" tag={Link} onClick={googleSignIn}>
                                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                                Sign In With Google
                            </Button> */}

                                    <p className="mt-4 text-center dark:text-gray-200">Already have an account?
                                        <Link className="text-base font-medium text-purple-600 dark:text-purple-400 hover:underline" to="/signin" > Login </Link> here
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

export default SignUp
