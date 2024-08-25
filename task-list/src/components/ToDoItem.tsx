import React from 'react'
import { ToDo } from '../model'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone,MdDelete  } from "react-icons/md";
import "./styles.css"
import ToDoList from './ToDoList';

interface Props{
  toDo: ToDo
  ListToDo: ToDo[]
  setListToDo:React.Dispatch<React.SetStateAction<ToDo[]>>

}
const ToDoItem: React.FC<Props> = ({toDo, ListToDo, setListToDo}) => {
  
  const handleDone = (id: number) =>{
    setListToDo( ListToDo.map((task) => 
      task.id === id ? {...task, isCompleted: !task.isCompleted } : task
    ))
  };
  const handleDelet = (id: number) =>{
    setListToDo(
      ListToDo.filter( task => task.id !== id)
    )
  };

  return (
    <form className='toDoItem'>
      {
        toDo.isCompleted ? (
          <s className='toDoItem-text'>
            {toDo.task}
          </s>
        ):
        (
          <span className='toDoItem-text'>
            {toDo.task}
          </span>
        )
      }
      <div>
        <span className='icon'>
        <MdOutlineDone 
          onClick={
            () => handleDone(toDo.id)
          }
        />
        </span>
        <span className='icon'>
          <CiEdit />
        </span>
        <span className='icon'>
          <MdDelete 
            onClick={
              () => handleDelet(toDo.id)
            }
          />
        </span>
      </div>
      
      
      
    </form>
  )
}

export default ToDoItem