import { useEffect, useState } from "react";
import ActionButton from "../../../designSystem/elements/ActionButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { todoActions } from "../../../redux/slices";
import EmptyToDo from "../EmptyToDo";
import "./AllTodoList.scss"

interface PropsItem {
    label: string
    onDelete: () => void;
    isDeleted?: boolean;
    indexProps?: number;
    idTodo: number;
}

export function TodoItem ({label, idTodo, indexProps, isDeleted = false, onDelete}: PropsItem) {
    const {allTodo} = useAppSelector(state => state.todoReducer)
    const isChecked = allTodo.find((_, index) => index === indexProps);
    const isOneUpdated = allTodo.some((todo) => todo.isUpdate === true)
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [value, setValue] = useState<string>(label)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(todoActions.updateTodo({id: idTodo, currentState: label, isUpdate: isUpdate}))
    } ,[])

    const onChecked = () => {
        if(!isUpdate){
        if(isChecked?.isChecked){
            dispatch(todoActions.removeCheckedProps({id: isChecked.id}))

        } else {
            dispatch(todoActions.addCheckedProps({id: isChecked?.id}))
        }
        }
        
    }
    const onUpdate = () => {
        setIsUpdate((prevState) => !prevState)
        dispatch(todoActions.updateTodo({id: idTodo, currentState: value, isUpdate: !isUpdate}))
    }
    const labelButton = isUpdate ? "Save" : "Update" 
    const todoItemClassName = isChecked?.isChecked ? "completed-item" : "todo-item"
    const className =  isOneUpdated ? "disabled-btn" : "edit-btn";
    const disabledDelete = isChecked?.isChecked || isOneUpdated;
    const checked = isUpdate ? false : isChecked?.isChecked

    return (
        <>
          <div className={todoItemClassName}>
                <div className="info-container">
                  {
                    !isDeleted && <input 
                                    checked={checked}
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
                      !isDeleted && <ActionButton disabled={isChecked?.isChecked} label={labelButton} onClick={onUpdate} className="edit-btn"/>
                    }
                  <ActionButton disabled={disabledDelete} label="Delete" onClick={onDelete} className={className}/>
                </div>
          </div>
        </>
    )
}


function AllTodoList() {
    const {allTodo} = useAppSelector(state => state.todoReducer);
    const dispatch = useAppDispatch();

    const onDelete = (id: number) => {
        dispatch(todoActions.deleteTodo({id, isDeleted: false}))
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
                      idTodo={todo.id}
                      onDelete={() => onDelete(Number(todo.id))} 
                    />
                )
            }
        </div>
        </>
    )

}

export default AllTodoList;
