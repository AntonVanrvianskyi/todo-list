import { NavLink } from "react-router-dom";
import "./ToDoTabs.scss"



function ToDoTabs() {


    return (
        <>
            <div className="container-tabs">
                <NavLink to="/allTodo" >All To Do</NavLink>
                <NavLink to="/deletedToDo" >Deleted To Do</NavLink>
            </div>
        </>
    )

}

export default ToDoTabs;