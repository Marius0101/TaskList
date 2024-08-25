import React from 'react'
import "./styles.css"

interface Props{
    toDo: string;
    setToDo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (event: React.FormEvent)=> void;
}


const InputFeild: React.FC<Props> = ({toDo, setToDo ,handleAdd}) => {
  return (
    <form className='input' onSubmit={handleAdd}>
        <input type='input'
            value={toDo}
            onChange={e =>setToDo(e.target.value)}
         placeholder='Enter a task'  className='inputBox'/>
        <button className='inputSubmit' type="submit">Add</button>
    </form>
  )
}

export default InputFeild