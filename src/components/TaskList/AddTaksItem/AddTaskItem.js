import React, { useState } from 'react';

import { ListGroupItem, FormControl } from 'react-bootstrap';

const AddTaskItem = ({ insertTaskHandler }) => {
    const [text, setText] = useState("");

    const onKeyDownHandler = (e) => { 
        if (e.key === "Enter" && text !== "") { 
            insertTaskHandler(text)
        }

        if (e.key === "Escape") { 
            setText(""); 
        }
    }
    return (
        <ListGroupItem onKeyDown={onKeyDownHandler}>
            <FormControl
                value={text}
                onChange={({target})=>setText(target.value)}
                placeholder="Añadir una nueva tarea..." />
        </ListGroupItem>
    );
}

export default AddTaskItem;