import React, { useState } from 'react';

import { ListGroupItem, FormCheck, FormControl } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/all';

import classes from './TaskItem.module.css';

const TaskItem = ({ active, text, toggleActiveHandler, deleteTaskHandler, updateTaskHandler}) => {
    const [editing, setEditing] = useState(false);
    const [bufferText, setBufferText] = useState(text);

    const onKeyDownHandler = (e) => { 
        if (e.key === "Enter" && bufferText !== "") { 
            setEditing(false);
            updateTaskHandler(bufferText);
        }

        if (e.key === "Escape") {
            setBufferText("");
        }
    }

    let pClasses = [];
    if (!active) pClasses = [...pClasses, classes.done];

    const textField = editing ?
        <FormControl
            onKeyDown={onKeyDownHandler}
            value={bufferText}
            onChange={({ target }) => setBufferText(target.value)} /> :
        <p className={pClasses.join(" ")}
            style={{ cursor: "pointer" }}
            onClick={toggleActiveHandler}> {text} </p>;

    return (
        <ListGroupItem className={classes.item}>
            <FormCheck checked={!active} onChange={toggleActiveHandler}/>
            { textField }
            <MdEdit
                onClick={()=>setEditing(!editing)}
                style={{ cursor: "pointer" }} color="#999" />
            <MdDelete
                onClick={deleteTaskHandler}
                style={{ cursor: "pointer" }} color="#999" />
        </ListGroupItem>
    );
}

export default TaskItem;