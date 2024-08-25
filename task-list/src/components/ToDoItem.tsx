import React, { useState, useRef, useEffect } from 'react'
import { ToDo } from '../model'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone,MdDelete  } from "react-icons/md";
import "./styles.css"
import { eventNames } from 'process';

interface Props{
  toDo: ToDo
  ListToDo: ToDo[]
  setListToDo:React.Dispatch<React.SetStateAction<ToDo[]>>

}
const ToDoItem: React.FC<Props> = ({toDo, ListToDo, setListToDo}) => {
  
  const [edit , setEdit] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<string>(toDo.task)

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

  const handleEdit = (event: React.FormEvent<HTMLFormElement>, id: number) => {
      event.preventDefault();

      setListToDo (ListToDo.map ( (task) => 
        task.id === id ? {...task,task:editTask}  : task
    ))
    setEdit(false)
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    inputRef.current?.focus()
  }, [edit]
  )
  return (
    <form
      className='toDoItem'
      onSubmit={ (event) => handleEdit(event, toDo.id)}
    >
      {
        edit? (
          < input 
            ref={inputRef}
            value = {editTask}
            onChange={(event)=>
              setEditTask(event.target.value)
            }
            className='toDoItem-input'
          />
        ): 
        (
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
        )
      }
      <div>
        <span className='icon'
          onClick={
            () => handleDone(toDo.id)
          }
        >
          <MdOutlineDone />
        </span>
        <span className='icon'
          onClick={
            () => {
              if(!edit && !toDo.isCompleted){
                setEdit(!edit)
              }
            }
          }
        >
          <CiEdit />
        </span>
        <span className='icon'
          onClick={
            () => handleDelet(toDo.id)
          }
        >
          <MdDelete />
        </span>
      </div>
    </form>
  )
}

export default ToDoItem