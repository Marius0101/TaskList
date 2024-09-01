import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import { ToDo, PlaceholderProps } from './model';
import ToDoList from './components/ToDoList';
import {DragDropContext,DropResult, DraggableLocation, DragStart, DragUpdate} from 'react-beautiful-dnd';
import { removeItemListByIndex } from './utils/Item';

const App:  React.FC = () => {
  

  const[toDo, setToDo] = useState<string>("") 
  const[listToDo, setListToDo] = useState<ToDo[]>([])
  const[completedListToDo, setCompletedListToDo] = useState<ToDo[]>([])
  const[ placeholderProps, setPlaceholderProps] = useState<PlaceholderProps | undefined>( undefined)

  const queryAttr = "data-rbd-drag-handle-draggable-id"

  const handleAdd= (event: React.FormEvent) =>{
    event.preventDefault();
    if (toDo){
      setListToDo([...listToDo, {id: Date.now(), task: toDo, isCompleted: false}])
      setToDo("")
    }
  };

  const handleDragEnd = (result:DropResult) =>{
    setPlaceholderProps(undefined)
    const destination:DraggableLocation = result.destination as DraggableLocation
    if(!destination){
      console.error("Wrong destination")
      return
    }
    const source :DraggableLocation = result.source

    if(destination.droppableId === source.droppableId
        && source.index === destination.index)
    { 
      console.warn("Same place. No change need");
      return
    }
    if(destination.droppableId === source.droppableId)
    { 
      removeItemListByIndex(source.index, listToDo, setListToDo,destination.index)
    }
    else if(destination.droppableId !== source.droppableId)
    { 
      if(source.droppableId === "active"){
        removeItemListByIndex(source.index, listToDo, setListToDo,destination.index, completedListToDo, setCompletedListToDo)
      }
      else{
        removeItemListByIndex(source.index, completedListToDo, setCompletedListToDo,destination.index, listToDo, setListToDo)
      }
    }
  };

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId)
    if (!draggedDOM) {
      return
    }
    const parentNode = draggedDOM.parentNode;
    if (!parentNode || !(parentNode instanceof Element)) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index+1
    
    var clientY =
      parseFloat(window.getComputedStyle(parentNode).paddingTop) +
      Array.from(parentNode.children)
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = window.getComputedStyle(curr as Element);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0)
    console.log("y:"+clientY);
    console.log("x:"+parseFloat(
      window.getComputedStyle(parentNode).paddingLeft
    ));
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(
          window.getComputedStyle(parentNode).paddingLeft
        )
      })
  };

  const getDraggedDom = (draggableId: string) =>{
    const domQuery = `[${queryAttr}='${draggableId}']`
    const draggedDOM = document.querySelector(domQuery)

    return draggedDOM
  }

  const handleDragUpdate = (event: DragUpdate) => {
    if (!event.destination) {
      return;
    }
    const draggedDOM = getDraggedDom(event.draggableId);
    console.log("draggedDOM:"+draggedDOM?.parentNode?.firstElementChild?.className)

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index+1;
    const sourceIndex = event.source.index+1;
    const parentNode = draggedDOM.parentNode;
    if (!parentNode || !(parentNode instanceof Element)) {
      return;
    }
    const childrenArray = Array.from(parentNode.children)
    const movedItem = childrenArray[sourceIndex];
    console.log(movedItem.children.item(0));
    childrenArray.splice(sourceIndex, 1);
    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex +1)
    ];
    var clientY =
      parseFloat(window.getComputedStyle(parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(
          window.getComputedStyle(parentNode).paddingLeft
        )
      });
  };

  return (
      <div className='App'>
        <span className='heading'>Task List</span>
        <InputFeild 
          toDo = {toDo}
          setToDo = {setToDo}
          handleAdd = {handleAdd}
        />
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragUpdate={handleDragUpdate}
          onDragStart={handleDragStart}
        >
        <ToDoList 
          listToDo={listToDo}
          setListToDo={setListToDo}
          completedListToDo ={completedListToDo}
          setCompletedListToDo = {setCompletedListToDo}
          placeholderProps = {placeholderProps}
        />
        </DragDropContext>
      </div>
      
  );
}

export default App;
