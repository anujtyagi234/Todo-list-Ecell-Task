import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

// Setting the root element for ReactModal
ReactModal.setAppElement('#root');

export default function DescriptionPopUp({ selectedTask, isSelected }) {
    // State to manage the modal open/close state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Effect to toggle modal based on isSelected prop changes
    useEffect(() => {
        setIsModalOpen(isSelected);
    }, [selectedTask]);

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Background overlay when modal is open */}
            {isModalOpen && (
                <div
                    className='bg-white opacity-80 fixed top-0 left-0 w-full h-full z-50'
                    onClick={closeModal}
                />
            )}
            {/* ReactModal component */}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className='Modal'
                overlayClassName='fixed inset-0 flex items-center justify-center Overlay transition-opacity duration-300 ease-in-out z-50'
                style={{
                    content: {
                        background: 'white',
                        padding: '2px',
                        border: 'solid black 1px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        width: '100%',
                        zIndex: 55,
                        top: '50%',
                        right: '50%',
                    },
                }}
            >
                {/* Modal content */}
                <div className='relative'>
                    <div className='bg-white container'>
                        {/* Close button */}
                        <button
                            className='absolute top-0 right-0 mr-4 text-3xl text-black border-2 rounded-full flex items-center justify-center w-10 h-10 hover:bg-gray-300'
                            onClick={closeModal}
                        >
                            X
                        </button>
                        {/* Task details */}
                        <h1 className='text-2xl font-bold my-3 mx-5'>Description</h1>
                        {/* Displaying selected task details */}
                        <p className='text-lg font-bold my-3 mx-5'>
                            {selectedTask ? selectedTask.heading : ''}
                        </p>
                        <p className='mx-5 my-3 text-red-500 font-bold'>
                            {/* Format due date if available */}
                            {selectedTask ? 'Due: ' + selectedTask.dueDate.split('-').reverse().join('-') : ''}
                        </p>
                        <p className='mx-5'>
                            {/* Display task description */}
                            {selectedTask ? selectedTask.description : ''}
                        </p>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}
