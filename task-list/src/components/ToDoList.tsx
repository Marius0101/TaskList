import React from 'react'
import "./styles.css";
import { PlaceholderProps, ToDo } from '../model';
import ToDoItem from './ToDoItem';
import { Droppable } from 'react-beautiful-dnd';
import { isEmpty } from "lodash";

interface Props {
    listToDo: ToDo[]
    setListToDo: React.Dispatch<React.SetStateAction<ToDo[]>>
    completedListToDo: ToDo[]
    setCompletedListToDo: React.Dispatch<React.SetStateAction<ToDo[]>>
    placeholderProps?: PlaceholderProps
}
const grid = 8;
const getListStyle = (isDraggingOver: boolean) :React.CSSProperties =>({
    background: isDraggingOver ? "lightblue" : "",
    padding: grid,
    width: 250,
    position: "relative"
});

const ToDoList: React.FC<Props> = ({listToDo, setListToDo, completedListToDo, setCompletedListToDo, placeholderProps}) => {
    

    return (
        

            <div className='ListToDo'>
                <Droppable 
                droppableId='active'
                type='group'
                >
                    {
                        (provide, snapshot)=> (
                            <div 
                            className='tasks active'
                            {...provide.droppableProps}
                            ref ={provide.innerRef}
                            >
                                <span className='tasks-heading'>Active Tasks</span>
                                {listToDo.map((item, index) =>(
                                    <ToDoItem
                                        toDo={item}
                                        key={item.id}
                                        ListToDo={listToDo}
                                        setListToDo={setListToDo}
                                        index={index}
                                        destinationList = {completedListToDo}
                                        setDestinationList = {setCompletedListToDo}
                                    />
                                ))}
                                {provide.placeholder}
                                {
                                    !isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                                        <div
                                            className='placeholder'
                                            style= {{
                                                top: placeholderProps.clientY,
                                                left: placeholderProps.clientX,
                                                height: placeholderProps.clientHeight,
                                                width: placeholderProps.clientWidth,
                                            }}
                                        >
                                        </div>
                                    )
                                
                                }
                            </div>
                            
                        )
                    }
                </Droppable>
                <Droppable 
                droppableId='completed'
                type='group'
                >
                    {
                        (provide, snapshot)=> (
                            <div 
                            className='tasks completed'
                            {...provide.droppableProps}
                            ref ={provide.innerRef}
                            >
                                <span className='tasks-heading'>Completed Tasks</span>
                                {completedListToDo.map((item, index) =>(
                                    <ToDoItem
                                        toDo={item}
                                        key={item.id}
                                        ListToDo={completedListToDo}
                                        setListToDo={setCompletedListToDo}
                                        index ={index}
                                        destinationList = {listToDo}
                                        setDestinationList = {setListToDo}
                                    />
                                ))}
                                {provide.placeholder}
                                {
                                    !isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                                        <div
                                            className='placeholder'
                                            style= {{
                                                top: placeholderProps.clientY,
                                                left: placeholderProps.clientX,
                                                height: placeholderProps.clientHeight,
                                                width: placeholderProps.clientWidth
                                            }}
                                        >
                                        </div>
                                    )
                                
                                }
                            </div>
                        )
                    }
                </Droppable>
                
                
            </div>           
        
    )
}

export default ToDoList