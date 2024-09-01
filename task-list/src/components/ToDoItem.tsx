import React, { useState, useRef, useEffect } from 'react'
import { ToDo } from '../model'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone,MdDelete  } from "react-icons/md";
import "./styles.css"
import { Draggable } from 'react-beautiful-dnd';
import { removeItemList } from '../utils/Item';

interface Props{
  toDo: ToDo
  ListToDo: ToDo[]
  setListToDo:React.Dispatch<React.SetStateAction<ToDo[]>>
  index: number
  destinationList: ToDo[]
  setDestinationList: React.Dispatch<React.SetStateAction<ToDo[]>>
}

const grid = 8 
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "",

  // styles we need to apply on draggables
  ...draggableStyle
});

const ToDoItem: React.FC<Props> = ({toDo, ListToDo, setListToDo, index, destinationList, setDestinationList}) => {
  
  const [edit , setEdit] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<string>(toDo.task)

  const handleDone = (id: number) =>{
    removeItemList(id, ListToDo, setListToDo,destinationList, setDestinationList )
  };

  const handleDelete = (id: number) =>{
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
    <Draggable
    draggableId={String(toDo.id)}
    key={toDo.id}
    index={index}
    >
      {
        (provide, snapshot) => (
          <form
          className='toDoItem'
          onSubmit={ (event) => handleEdit(event, toDo.id)}
          {...provide.dragHandleProps}
          {...provide.draggableProps}
          ref={provide.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provide.draggableProps.style
          )}
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
                  () => handleDelete(toDo.id)
                }
              >
                <MdDelete />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default ToDoItem