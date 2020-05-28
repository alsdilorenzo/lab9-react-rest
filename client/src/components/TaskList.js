import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TaskItem from "./TaskItem";

const TaskList = (props) => {

    let {tasks, editTask, deleteTask} = props;

    return (
        <>
            {tasks &&
            <ListGroup as="ul" variant="flush">
                {tasks.map((task) => <TaskItem key = {task.id} task = {task} editTask = {editTask} deleteTask = {deleteTask} />) }
            </ListGroup>}
        </>
    );
}

export default TaskList;