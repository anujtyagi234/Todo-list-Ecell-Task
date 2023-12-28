import React, { useState, useEffect } from 'react';
import Task from './Task';
import DescriptionPopUp from './DescriptionPopUp';

export default function AllTasks({ sortType, dummyTasks, setDummyTasks }) {
  // States for managing tasks, selected task, window width, task state, and description popup
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [taskState, setTaskState] = useState('pending');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(true);

  // Function to update window width on resize
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Effect for handling window resize event
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  // Effect to update tasks based on changes in dummyTasks prop
  useEffect(() => {
    const cTasks = dummyTasks.filter((task) => !task.pending);
    const pTasks = dummyTasks.filter((task) => task.pending);
    setCompletedTasks(cTasks);
    setPendingTasks(pTasks);
  }, [dummyTasks]);

  // Function to delete a task
  const handleDelete = (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
  
    if (confirmed) {
      const updatedTasks = dummyTasks.filter((task) => task.id !== taskId);
      setDummyTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setShowDescriptionPopup(false);
    }
  };
  

  // Function to mark a task as completed
  const handleCompleted = (taskId) => {
    const updatedTasks = dummyTasks.map((task) =>
      task.id === taskId ? { ...task, pending: false } : task
    );
    setDummyTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowDescriptionPopup(false);
  };

  // Function to handle task click, toggling selection
  const handleClick = (task) => {
    setSelectedTask(selectedTask === task ? null : task);
  };

  // Function to truncate heading based on window width
  const truncateHeading = (heading) => {
    let adjustedMaxLength = windowWidth < 768 ? 20 : 50;
    return heading.length > adjustedMaxLength ? `${heading.substring(0, adjustedMaxLength)}...` : heading;
  };

  // Determine the list of tasks based on task state
  const sortedTasks = taskState === 'pending' ? pendingTasks : completedTasks;

  // Effect to sort tasks based on sort type
  useEffect(() => {
    let sortedTasksCopy = [...sortedTasks];
    if (sortType === 'creationDate') {
      sortedTasksCopy = sortedTasksCopy.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    } else if (sortType === 'dueDate') {
      sortedTasksCopy = sortedTasksCopy.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    setPendingTasks(taskState === 'pending' ? sortedTasksCopy : pendingTasks);
    setCompletedTasks(taskState === 'completed' ? sortedTasksCopy : completedTasks);
  }, [sortType]);

  return (
    <div className='flex justify-center mt-2 relative '>
      {/* Task container */}
      <div className={`min-h-full ${selectedTask && windowWidth > 1024 ? ' w-7/12 ' : 'w-11/12'} rounded-l-lg bg-gradient-to-b from-c1 to-c2 h-80% rounded-r-lg`}>
        {/* Title based on taskState */}
        <h1 className='text-2xl font-bold my-3 ml-5'>{taskState === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}</h1>

        {/* Task list */}
        <div className='overflow-y-auto cursor-pointer' style={{ maxHeight: 'calc(74vh - 7rem)' }}>
          {taskState === 'pending'
            ? pendingTasks && pendingTasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                heading={truncateHeading(task.title)}
                isSelected={selectedTask === task}
                taskState={taskState}
                onClick={() => handleClick(task)}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
              />
            ))
            : completedTasks && completedTasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                heading={truncateHeading(task.title)}
                isSelected={selectedTask === task}
                taskState={taskState}
                onClick={() => handleClick(task)}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
              />
            ))}
        </div>

        {/* Task state switch */}
        <div className='flex absolute bottom-0 justify-around items-center w-7/12 h-16 border-t-2 border-black font-bold'>
          <div className={`${taskState === 'pending' ? 'bg-purple1 h-full rounded-bl-lg' : ''} flex items-center justify-center w-1/2 cursor-pointer`} onClick={() => { setTaskState('pending') }}>
            Pending
          </div>
          <div className={`${taskState === 'completed' ? 'bg-purple1 h-full' : ''} flex items-center justify-center w-1/2 cursor-pointer`} onClick={() => { setTaskState('completed') }}>
            Completed
          </div>
        </div>
      </div>

      {/* Description popup based on window width and selected task */}
      {selectedTask && showDescriptionPopup && windowWidth < 1024 && (
        <div className='lg:hidden'>
          <DescriptionPopUp selectedTask={selectedTask} isSelected={selectedTask && windowWidth < 1024} />
        </div>
      )}

      {/* Description sidebar based on window width and selected task */}
      {selectedTask && showDescriptionPopup && (
        <div className='hidden lg:block min-h-full w-4/12 rounded-r-lg bg-gradient-to-b from-c1 to-c2 border-l-2 border-black overflow-y-auto'>
          <h1 className='text-2xl font-bold my-3 mx-5'>Description</h1>
          <p className='text-lg font-bold my-3 mx-5'>{selectedTask ? selectedTask.heading : ''}</p>
          <p className='mx-5 my-3 text-red-500 font-bold'>
            {selectedTask ? 'Due: ' + selectedTask.dueDate.split('-').reverse().join('-') : ''}
          </p>
          <p className='mx-5'>{selectedTask ? selectedTask.description : ''}</p>
        </div>
      )}
    </div>
  );
}
