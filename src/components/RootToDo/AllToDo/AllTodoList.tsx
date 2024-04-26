import { useState } from "react";
import ActionButton from "../../../designSystem/elements/ActionButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { todoActions } from "../../../redux/slices";
import EmptyToDo from "../EmptyToDo";
import "./AllTodoList.scss"

interface PropsItem {
    label: string
    onDelete: () => void;
    isDeleted?: boolean;
    indexProps?: number
}

export function TodoItem ({label, indexProps, isDeleted = false, onDelete}: PropsItem) {
    const {allTodo} = useAppSelector(state => state.todoReducer)
    const isChecked = allTodo.find((_, index) => index === indexProps)?.isChecked;
    const idTodo = allTodo.find((todo) => todo.value === label)?.id
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [value, setValue] = useState<string>(label)
    const dispatch = useAppDispatch();
  
    const onChecked = () => {
        if(isChecked){
            dispatch(todoActions.removeCheckedProps({id: idTodo}))

        } else {
            dispatch(todoActions.addCheckedProps({id: idTodo}))
        }
        
    }

    const onUpdate = () => {
        setIsUpdate((prevState) => !prevState)
        if(isUpdate) {
            dispatch(todoActions.updateTodo({id: idTodo, currentState: value}))
        } else {
            dispatch(todoActions.updateTodo({id: idTodo, currentState: label}))

        }
    }
    const labelButton = isUpdate ? "Save" : "Update" 
    const todoItemClassName = isChecked ? "completed-item" : "todo-item"

    return (
        <>
          <div className={todoItemClassName}>
                <div className="info-container">
                  {
                    !isDeleted && <input 
                                    checked={isChecked}
                                    onChange={onChecked} 
                                    className="checkbox" 
                                    type="checkbox"
                                   />
                  }
                  {
                    isUpdate && <input 
                                    className="update-input"
                                    value={value} 
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                    
                  }
                  {
                    !isUpdate && <p>{label}</p>
                  }
                </div>
                <div className="container-btn">
                    {
                      !isDeleted && <ActionButton disabled={isChecked} label={labelButton} onClick={onUpdate} className="edit-btn"/>
                    }
                  <ActionButton disabled={isChecked} label="Delete" onClick={onDelete} className="edit-btn"/>
                </div>
          </div>
        </>
    )
}


function AllTodoList() {
    const {allTodo} = useAppSelector(state => state.todoReducer);
    const dispatch = useAppDispatch();

    const onDelete = (index: number) => {
        dispatch(todoActions.deleteTodo({index, isDeleted: false}))
    }

    if(allTodo.length === 0) {
        return <EmptyToDo/>
    }

    return (
        <>
        <div className="all-todo">
            {
                allTodo.map((todo, index) => 
                    <TodoItem
                      key={index}
                      indexProps={index} 
                      label={todo.value}
                      onDelete={() => onDelete(index)} 
                    />
                )
            }
        </div>
        </>
    )

}

export default AllTodoList;
