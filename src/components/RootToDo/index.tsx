import { useState } from "react";
import "./RootToDo.scss"
import { useAppDispatch } from "../../hooks/redux.hook";
import { todoActions } from "../../redux/slices";
import ActionButton from "../../designSystem/elements/ActionButton";
import ToDoTabs from "../ToDoTabs";
import { Outlet } from "react-router-dom";


function RootToDo (){

    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const createNewToDo = () => {
        dispatch(todoActions.createNewToDo(value))
        setValue("")
    }

    const isDisabled = !value;
    
    return (
        <>
            <div className="container">
                <h1>
                    To Do App
                </h1>
                <div
                  className="input-container"
                >
                    <input 
                      value={value} 
                      onChange={(event) => setValue(event.target.value)} 
                      placeholder="Add todo"
                      className="input-create-todo"
                    />
                    <ActionButton
                        disabled={isDisabled} 
                        label="Add" 
                        className={isDisabled ? "btn-disabled" : "button"}
                        onClick={createNewToDo}
                    />
                </div>
                <ToDoTabs/>
               <Outlet/>
            </div>
        </>
    )
}

export default RootToDo;