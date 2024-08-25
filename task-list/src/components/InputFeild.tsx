import React from 'react'
import "./styles.css"

const InputFeild = () => {
  return (
    <form className='input'>
        <input type='input' placeholder='Enter a task'  className='inputBox'/>
        <button className='inputSubmit' type="submit">Add</button>
    </form>
  )
}

export default InputFeild