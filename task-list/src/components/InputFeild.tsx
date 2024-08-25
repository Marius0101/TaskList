import React, { useRef } from 'react'
import "./styles.css"

interface Props{
    toDo: string;
    setToDo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (event: React.FormEvent)=> void;
}


const InputFeild: React.FC<Props> = ({toDo, setToDo ,handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null);
    return (
    <form className='input' 
        onSubmit={(event)=> {
            handleAdd(event)
            inputRef.current?.blur();
        }}>
        <input type='input'
            ref={inputRef}
            value={toDo}
            onChange={e =>setToDo(e.target.value)}
         placeholder='Enter a task'  className='inputBox'/>
        <button className='inputSubmit' type="submit">Add</button>
    </form>
  )
}

export default InputFeild