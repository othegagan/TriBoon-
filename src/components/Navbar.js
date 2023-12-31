import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, WindmillContext } from '@windmill/react-ui'
import { MoonIcon, SunIcon, } from '../icons';

const Navbar = (props) => {

    const { mode, toggleMode } = useContext(WindmillContext);

    return (
        <>
            <header className="z-40 py-4 lg:px-16 md:px-10 bg-white shadow-bottom dark:bg-gray-800">
            <div className=" flex items-center justify-between h-full px-12 sm:px-6 xs:px-6 mx-auto text-purple-600 dark:text-purple-300">

                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200" >
                        <span className="p-0 mr-0 text-purple-600">Tri</span>  Boon
                    </div>

                    <div className='flex flex-row'>
                        {/* Toggle Button */}
                        <div className=" flex mr-4 right-4 bottom-4 dark:bg-main-dark-bg">
                            <button
                                className="rounded-md focus:outline-none focus:shadow-outline-purple"
                                onClick={toggleMode}
                                aria-label="Toggle color mode"
                            >
                                {mode === "dark" ? (
                                    <SunIcon
                                        className="w-8 h-8 text-white"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <MoonIcon
                                        className="w-8 h-8"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>

                        {
                            props.active === 'login' ?
                                <Button tag={Link} to="/signin">Log In</Button>
                                :
                                <Button tag={Link} to="/signup">Sign Up</Button>

                        }
                    </div>

                </div>
            </header>
        </>
    )
}

export default Navbar