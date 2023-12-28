import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";

export default function Home() {
  // State to manage the sorting type
  const [sortType, setSortType] = useState("creationDate");
  const [dummyTasks, setDummyTasks] = useState([]);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    setDummyTasks(tasksFromStorage);
  }, []);

  // Function to add a new task to dummyTasks and update local storage
  const addNewTask = (newTask) => {
    const updatedTasks = [...dummyTasks, newTask];
    setDummyTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function to handle sorting by creation date
  const handleSortByCreationDate = () => {
    setSortType("creationDate");
  };

  // Function to handle sorting by due date
  const handleSortByDueDate = () => {
    setSortType("dueDate");
  };

  return (
    <div>
      {/* Title */}
      <h1 className="text-blue1 text-5xl font-bold m-4">TO-DO LIST</h1>

      {/* Sort Options */}
      <div className="flex justify-center">
        <div className="sm:flex justify-end w-11/12">
          {/* Sort buttons */}
          <div className="flex justify-between items-center border-2 border-blue1 rounded-2xl h-12 ml-5 sm:w-6/12">
            {/* Sort by label */}
            <div className="p-3 bg-c1 h-12 rounded-l-2xl border-t-2 border-b-2 border-blue1 text-blue1 w-1/3">
              Sort by
            </div>
            {/* Sort by Date Created button */}
            <div
              className={`flex items-center pl-10 w-1/3 cursor-pointer h-full ${sortType === "creationDate" ? "bg-purple1 font-bold" : ""
                }`}
              onClick={handleSortByCreationDate}
            >
              Date Created
            </div>
            {/* Sort by Due Date button */}
            <div
              className={`flex items-center pl-10 w-1/3 cursor-pointer h-full rounded-r-2xl ${sortType === "dueDate" ? "bg-purple1 font-bold" : ""
                }`}
              onClick={handleSortByDueDate}
            >
              Due date
            </div>
          </div>

          {/* Component to add a new task */}
          <AddTask onAddTask={addNewTask} />
        </div>
      </div>

      {/* Component to display tasks based on the sortType */}
      <div>
        <AllTasks sortType={sortType} dummyTasks={dummyTasks} setDummyTasks={setDummyTasks} />
      </div>
    </div>
  );
}
