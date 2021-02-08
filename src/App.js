import React, {useState, useEffect} from 'react';

import TaskList from '@internal/components/TaskList/TaskList';

import classes from './App.module.css';

const BASEURL = "http://localhost:3500/api";

function App() {
    const [tasks, setTasks] = useState([]);

    const fetchAll = async () => {
        try {
            const url = `${BASEURL}/task/`;
            const response = await fetch(url);

            if (response.ok) {
                const tasks = await response.json();
                let sortedTask = [];

                //Ordenar por activo o inactivo
                tasks.forEach(task => {
                    if (task.active) {
                        sortedTask = [task, ...sortedTask];
                    } else {
                        sortedTask = [...sortedTask, task];
                    }
                });

                setTasks(sortedTask);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const insertNewTask = async (text) => {
        try {
            const url = `${BASEURL}/task/`;
            const body = JSON.stringify({ text });

            const response = await fetch(url, {
                body,
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            });

            if (response.ok) {
                await fetchAll();
            }
            
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateTaskText = async (_id, text) => {
        try {
            const url = `${BASEURL}/task/`;
            
            const body = JSON.stringify({
                id: _id,
                text: text
            });

            const response = await fetch(url, {
                body,
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                }
            });

            if (response.ok) {
                await fetchAll();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleActiveTask = async (_id) => {
        try {
            const url = `${BASEURL}/task/toggle/${_id}`;
            
            const response = await fetch(url, {
                method: "PUT"
            });

            if (response.ok) {
                await fetchAll();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteTaskByID = async (_id) => {
        const url = `${BASEURL}/task/${_id}`;
        
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (response.ok) {
            await fetchAll();
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className={classes.container}>
            <h1> Task manage App </h1>
            <TaskList
                deleteTaskHandler={deleteTaskByID}
                insertTaskHandler={insertNewTask}
                updateTaskHandler={updateTaskText}
                toggleActiveHandler={toggleActiveTask}
                tasks={tasks} />
        </div>
    );
}

export default App;