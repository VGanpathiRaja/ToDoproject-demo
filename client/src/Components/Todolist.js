import './Todolist.css'
import React from 'react'
// import CheckIcon from '@material-ui/icons/Check'
// import EditIcon from '@material-ui/icons/Edit'
// import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
function Todolist(props) {
    const todolist = props.todolist.map((task,index) => {
        const taskComplete = task => {
            axios.put(`http://localhost:3015/api/tasks/${task._id}` , {
                _id : task._id,
                todo: task.todo,
                isComplete : !task.isComplete
            }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
        }
        const removeTask = id => {
            axios.delete(`http://localhost:3015/api/tasks/${id}`).then(res => props.removeTask(res.data)).catch(err => console.log(err))
        } 
        return <li key = {index}>
            <div style = {{display : 'flex'}}>
               <div  className = {task.isComplete ? 'isComplete' : 'bi bi-check2'}/>
               <p className = {task.isComplete ? 'taskcomplete' : ''} onClick = {() => {
                   taskComplete(task)
               }}>{task.todo}</p>
            </div>
            <div>
                <div className = ' bi bi-pencil' onClick = {() => {
                    props.tasktoUpdate(task)
                    props.showPopup()
                }}/>
                <div className = 'bi bi-x-lg' onClick = {() => {
                    removeTask(task._id)
                }}/>
            </div>
        </li>
    })
    return (
        <div className = 'tasklist'>
            <ul>
                {todolist}
            </ul>
        </div>
    )
}

export default Todolist
