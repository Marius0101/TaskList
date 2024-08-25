import React from 'react'
import { ToDo } from '../model'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone,MdDelete  } from "react-icons/md";
import "./styles.css"

interface Props{
  toDo: ToDo
  ListToDo: ToDo[]
  setListToDo:React.Dispatch<React.SetStateAction<ToDo[]>>

}
const ToDoItem: React.FC<Props> = ({toDo, ListToDo, setListToDo}) => {
  return (
    <form className='toDoItem'>
      <span className='toDoItem-text'>
        {toDo.task}
      </span>
      <div>
        <span className='icon'>
        <MdOutlineDone />
        </span>
        <span className='icon'>
          <CiEdit />
        </span>
        <span className='icon'>
          <MdDelete />
        </span>
      </div>
      
      
      
    </form>
  )
}

export default ToDoItem