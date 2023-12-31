import React from 'react'

const Badge = (props) => {
    return (
        <>
            {props.type === 'Low' &&
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-700   w-24 justify-center" style={{ "backgroundColor": '#8ab339' }}>{props.type}</span>
            }

            {props.type === 'Medium' &&
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-700    w-24 justify-center" style={{ "backgroundColor": '#fbaf00' }}>{props.type}</span>
            }

            {props.type === 'High' &&
                <span className="inline-flex px-3 text-xs font-medium leading-5 rounded-full text-gray-100  dark:text-gray-100 dark:bg-red-700 bg-red-600 w-24 justify-center">{props.type}</span>
            }

            {props.type === 'To Do' &&
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-600   w-24 justify-center" style={{ "backgroundColor": '#dec7a7' }}>{props.type}</span>
            }

            {props.type === 'In Progress' &&
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-100  dark:text-gray-100 dark:bg-purple-700 bg-purple-600 w-24 justify-center">{props.type}</span>
            }

            {props.type === 'Done' &&
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-700   w-24 justify-center" style={{ "backgroundColor": '#8ab339' }}>{props.type}</span>
            }
        </>
    )
}

export default Badge