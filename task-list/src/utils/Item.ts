import { ToDo } from "../model";

export const removeItemListByIndex = (
    sourceIndex:number,
    sourceList:ToDo[],
    setSourceList: React.Dispatch<React.SetStateAction<ToDo[]>>,
    destinationIndex: number,
    destinationList? :ToDo[],
    setDestinationList?: React.Dispatch<React.SetStateAction<ToDo[]>>
    ): void => {

        const task: ToDo = sourceList[sourceIndex]
        sourceList.splice(sourceIndex, 1)
        setSourceList(sourceList)
        if(!destinationList || !setDestinationList){
        sourceList.splice(destinationIndex, 0, task)
        }
        else{
        task.isCompleted = !task.isCompleted
        destinationList.splice(destinationIndex, 0, task)
        setDestinationList(destinationList)
        }
    };
export const removeItemList = (
    id: number,
    sourceList:ToDo[],
    setSourceList: React.Dispatch<React.SetStateAction<ToDo[]>>,
    destinationList :ToDo[],
    setDestinationList: React.Dispatch<React.SetStateAction<ToDo[]>>
    ): void => {

        const task: ToDo|undefined = sourceList.find( task => task.id === id);
        if(!task){
            console.error("Task not found");
            return
        }
        task.isCompleted = !task.isCompleted
        setSourceList(sourceList.filter( task => task.id !== id))
        destinationList.push(task)
        setDestinationList(destinationList)
    };