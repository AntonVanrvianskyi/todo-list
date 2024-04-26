import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { todoActions } from "../../../redux/slices";
import { TodoItem } from "../AllToDo/AllTodoList";
import EmptyToDo from "../EmptyToDo";
import "../AllToDo/AllTodoList.scss";

function DeletedToDo () {
    const {deletedTodo} = useAppSelector(state => state.todoReducer)
    const dispatch = useAppDispatch()

    const onDelete = (index: number) => {
        dispatch(todoActions.deleteTodo({index, isDeleted: true}))
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
                      label={todo.value}
                      onDelete={() => onDelete(index)} 
                    />
                )
            }
        </div>
        </>
    )
}

export default DeletedToDo;
