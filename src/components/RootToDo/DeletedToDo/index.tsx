import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { todoActions } from "../../../redux/slices";
import { TodoItem } from "../AllToDo/AllTodoList";
import EmptyToDo from "../EmptyToDo";
import "../AllToDo/AllTodoList.scss";

function DeletedToDo () {
    const {deletedTodo} = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch()

    const onDelete = (id: number) => {
        dispatch(todoActions.deleteTodo({id, isDeleted: true}))
    }

    if (deletedTodo.length === 0) {

        return <EmptyToDo />
    }

    return (
        <>
          <div className="all-todo">
            {
                deletedTodo.map((todo, index) => 
                    <TodoItem
                      key={index}
                      isDeleted
                      idTodo={todo.id} 
                      label={todo.value}
                      onDelete={() => onDelete(todo.id)} 
                    />
                )
            }
        </div>
        </>
    )
}

export default DeletedToDo;
