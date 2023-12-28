import { React, useState } from 'react';
import ReactModal from 'react-modal';

// Set the root element for ReactModal
ReactModal.setAppElement('#root');

export default function AddTask({ onAddTask }) {
    // State to manage the modal open/close state and new task data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        image: '',
        creationDate: Date.now(),
        pending: true,
    });

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to format date in DD-MM-YYYY format
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        let month = `${d.getMonth() + 1}`;
        let day = `${d.getDate()}`;

        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        return `${day}-${month}-${year}`;
    };

    // Function to handle adding a new task
    const handleAddTask = () => {
        // Retrieve existing tasks from local storage or initialize empty array
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Format creation date
        const updatedTask = {
            ...newTask,
            creationDate: formatDate(Date.now()),
            pending: true,
            id: existingTasks ? existingTasks.length : 0,
        };


        // Update tasks with the new task
        const updatedTasks = [...existingTasks, updatedTask];

        // Save updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        onAddTask(updatedTask);

        // Reset new task state and close modal
        setNewTask({
            title: '',
            description: '',
            dueDate: '',
            image: '',
            creationDate: Date.now(),
        });
        closeModal();
    };

    // Function to handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
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
            {/* Button to open the modal */}
            <button className='bg-blue1 rounded-lg w-full mt-2 sm:mt-0 sm:w-40 h-12 ml-4 text-white' onClick={openModal}>
                Create new task
            </button>
            {/* ReactModal component for adding tasks */}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className='Modal'
                overlayClassName='fixed inset-0 flex items-center justify-center Overlay transition-opacity duration-300 ease-in-out z-50'
                style={{
                    content: {
                        background: 'white',
                        padding: '20px',
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
                <div className='container'>
                    {/* Form to add a new task */}
                    <p className="text-black mb-4 text-blue1 font-bold text-xl">New Task</p>
                    <div className="text">
                        {/* Input fields for task details */}
                        <input type="text" name="title" value={newTask.title} placeholder="title" className="border rounded px-2 py-1 mt-2 w-full bg-c1" onChange={handleInputChange} />
                        <textarea name="description" value={newTask.description} placeholder="description..." className="border rounded px-2 py-1 mt-2 w-full resize-none bg-c1" onChange={handleInputChange} rows="4"></textarea>
                        <div className="mt-2">
                            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-1">Due date:</label>
                            <input type="date" name="dueDate" value={newTask.dueDate} id="dueDate" placeholder="Due date" className="border rounded px-2 py-1 w-full bg-c1" onChange={handleInputChange} />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="TaskImage" className="block text-sm font-semibold text-gray-700 mb-1">Task Image:</label>
                            <input type="file" name='image' value={newTask.image} accept="image/*" id="TaskImage" onChange={handleInputChange} />
                        </div>
                        {/* Buttons to add or close the modal */}
                        <div className="flex justify-end mt-4">
                            <button onClick={handleAddTask} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Add
                            </button>
                            <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}
