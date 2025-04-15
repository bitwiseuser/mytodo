import './index.css';
import React, { useState, useEffect } from 'react'

function ToDoList() {

    var [tasks, setTasks] = useState([]);
    var [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    useEffect(() => {
        try {
            var storedTasks = JSON.parse(localStorage.getItem("Tasks"));
            if (storedTasks !== null && storedTasks.length > 0) {
                setTasks(storedTasks);
            }
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    function addTask() {
        if (newTask.trim() !== "") {
            tasks.push(newTask)
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
            localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
        }
    }


    return (<div className="to-do-list">
        <h1>To-Do-List</h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange} />
            <button
                className="add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        ✂
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}>
                        👍
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskDown(index)}>
                        👎
                    </button>
                </li>)}
        </ol>
    </div>);
}

export default ToDoList;