import React, { useState } from 'react'
// import { GreenTickIcon } from '../icons'
import PageTitle from '../components/Typography/PageTitle'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

function Modals() {
    const [isModalOpen, setIsModalOpen] = useState(true)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>
            <PageTitle>Modals</PageTitle>

            <div>
                <Button onClick={openModal}>Open modal</Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader><div className=' text-green-400 font-extrabold'>Are you sure..!</div> </ModalHeader>
                <ModalBody>
                    Do you really want to delete this user? This process cannot be undone.!
                </ModalBody>
                {/* <div className="flex flex-row items-center justify-left">
                    <ModalHeader> <GreenTickIcon /> </ModalHeader>
                    <div className='ml-6 text-sm text-gray-700 dark:text-gray-400'>
                        Do you really want to delete this user?
                    </div>
                </div> */}

                <ModalFooter>
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={closeModal}>Cancel</Button>
                    </div>
                    <div className="hidden sm:block">
                        <Button>Delete User</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModal}>Cancel</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large">Delete User</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Modals
