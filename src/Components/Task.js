import React, { useState, useEffect } from 'react';

export default function Task({ taskId, heading, onClick, isSelected, taskState, handleDelete, handleCompleted }) {
  // State to manage the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to handle window resize
  useEffect(() => {
    // Function to update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check if the window width falls into specific categories
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isMobile = windowWidth < 640;

  return (
    <div
      onClick={onClick}
      // Dynamically set classes based on window width and selection state
      className={`${isSelected ? 'bg-gray-200 border-gray-500 z-50' : 'bg-white border-none'
        } ${isMobile ? 'flex flex-col h-20' : 'flex justify-between items-center'} w-11/12 rounded-lg lg:h-16 ml-4 mb-2 border border-black`}
    >
      {/* Task heading */}
      <p className='text-40px font-semibold ml-4'>{heading}</p>

      {/* Action buttons */}
      <div className={`ml-auto mr-4 ${isTablet ? 'flex flex-col h-24 justify-around' : 'flex'}`}>
        {/* Delete button */}
        <button className='bg-c3 text-red-700 font-bold py-2 px-4 rounded mr-2 z-55' onClick={(event) => handleDelete(event,taskId)}>
          Delete
        </button>

        {/* Conditional Completed button based on task state */}
        {taskState === 'pending' && (
          <button className='bg-c4 text-green-700 font-bold py-2 px-4 rounded z-55' onClick={(e) => handleCompleted(e,taskId)}>
            Completed
          </button>
        )}
      </div>
    </div>
  );
}
