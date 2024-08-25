import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import { ToDo } from './model';
import ToDoList from './components/ToDoList';

const App:  React.FC = () => {
  
  const[toDo, setToDo] = useState<string>("") 
  const[listToDo, setListToDo] = useState<ToDo[]>([])
  
  const handleAdd= (event: React.FormEvent) =>{
    event.preventDefault();

    if (toDo){
      setListToDo([...listToDo, {id: Date.now(), task: toDo, isCompleted: false}])
      setToDo("")
    }
  };

  console.log(listToDo)
  return (
    <div className='App'>
      <span className='heading'>Task List</span>
      <InputFeild 
        toDo = {toDo}
        setToDo = {setToDo}
        handleAdd = {handleAdd}
      />
      <ToDoList 
        listToDo={listToDo}
        setListToDo={setListToDo}
      />
    </div>
  );
}

export default App;
