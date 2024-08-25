import React from 'react'
import "./styles.css";
import { ToDo } from '../model';
import ToDoItem from './ToDoItem';

interface Props {
    listToDo: ToDo[]
    setListToDo: React.Dispatch<React.SetStateAction<ToDo[]>>

}
const ToDoList: React.FC<Props> = ({listToDo, setListToDo}) => {
  return (
    <div className='ListToDo'>
        {listToDo.map((item) =>(
            <ToDoItem
                toDo={item}
                key={item.id}
                ListToDo={listToDo}
                setListToDo={setListToDo}
            />
        ))}
    </div>
  )
}

export default ToDoList