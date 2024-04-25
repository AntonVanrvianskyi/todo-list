import { useState } from "react";
import ActionButton from "../../../designSystem/elements/ActionButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { todoActions } from "../../../redux/slices";
import EmptyToDo from "../EmptyToDo";
import "./AllTodoList.scss"

interface PropsItem {
    label: string
    onDelete: () => void;
    isDeleted?: boolean
}

export function TodoItem ({label, isDeleted = false, onDelete}: PropsItem) {

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [value, setValue] = useState<string>(label)
    const [checked, setChecked] = useState(false)
    const dispatch = useAppDispatch();
    const onUpdate = () => {
        
        setIsUpdate((prevState) => !prevState)
        if(isUpdate) {
            dispatch(todoActions.updateTodo({prevState: "", currentState: value}))
        } else {
            dispatch(todoActions.updateTodo({prevState: label, currentState: ""}))

        }
    }
    const labelButton = isUpdate ? "Save" : "Update" 
    const todoItemClassName = checked ? "completed-item" : "todo-item"

    return (
        <>
          <div className={todoItemClassName}>
                <div className="info-container">
                  {
                    !isDeleted && <input 
                                    checked={checked}
                                    onChange={() => setChecked((prevState) => !prevState)} 
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
                      !isDeleted && <ActionButton disabled={checked} label={labelButton} onClick={onUpdate} className="edit-btn"/>
                    }
                  <ActionButton disabled={checked} label="Delete" onClick={onDelete} className="edit-btn"/>
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
                      label={todo}
                      onDelete={() => onDelete(index)} 
                    />
                )
            }
        </div>
        </>
    )

}

export default AllTodoList;
