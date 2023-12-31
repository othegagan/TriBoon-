import React from 'react'
import { Link } from 'react-router-dom'

import { ForbiddenIcon } from '../icons'

function Page404() {
    return (
        <div className="flex flex-col items-center dark:bg-black w-screen h-screen">
            <ForbiddenIcon className="w-16 h-16 mt-8 text-purple-600" aria-hidden="true" />
            <h1 className="text-6xl font-semibold text-gray-900 dark:text-gray-600">404</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Page not found. Check the address or{' '}
                <Link className="text-purple-600 hover:underline dark:text-purple-600" to="/">
                    go back
                </Link>
                .
            </p>
        </div>
    )
}

export default Page404
