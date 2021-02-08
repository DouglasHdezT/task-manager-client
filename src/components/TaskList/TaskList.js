import React from 'react';

import { ListGroup } from 'react-bootstrap';
import TaskItem from './TaskItem/TaskItem';
import AddTaskItem from './AddTaksItem/AddTaskItem';

import classes from './TaskList.module.css';

const TaskList = ({ tasks, toggleActiveHandler, insertTaskHandler, deleteTaskHandler, updateTaskHandler }) => {
    const tasksComponents = tasks.map(task => (
        <TaskItem
            key={task._id}
            deleteTaskHandler={() => deleteTaskHandler(task._id)}
            toggleActiveHandler={() => toggleActiveHandler(task._id)}
            updateTaskHandler={(text) => updateTaskHandler(task._id, text)}
            active={task.active}
            text={task.text} />
    ));
    
    return (
        <ListGroup className={classes.list}>
            { tasksComponents }
            <AddTaskItem
                insertTaskHandler={ insertTaskHandler }/>
        </ListGroup>
    );
}

export default TaskList;