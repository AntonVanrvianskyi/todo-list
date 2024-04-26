import {createSlice} from "@reduxjs/toolkit";

interface Todo {
    id: number;
    value: string,
    isChecked?: boolean
    isUpdate?: boolean
}
interface IState {
    allTodo: Todo[]
    deletedTodo: Todo[],
    counter: number,
}


const initialState: IState = {
    allTodo: [],
    deletedTodo: [],
    counter: 1,
}


const slice = createSlice({
    name: "todo-slice",
    initialState,
    reducers: {
        createNewToDo: (state, action) => {
            state.allTodo.push({id: state.counter ++, value: action.payload})
        },
        deleteTodo: (state, action) => {
            const {isDeleted, id} = action.payload 
            const index = state.allTodo.findIndex(todo => todo.id === id);

            if (!isDeleted){
                const deletedTodo = state.allTodo.splice(index, 1)
                state.deletedTodo.push(...deletedTodo)
            }  else {
                state.deletedTodo.splice(index, 1)
            }
        },
        updateTodo: (state, action) => {
            const {id, currentState, isUpdate} = action.payload
            const findedElement = state.allTodo.find((todo) => todo.id === id )
            if(findedElement) {
                findedElement.value = currentState
                findedElement.isUpdate = isUpdate
            }
           
        },
        addCheckedProps: (state, action) => {
            const {id} = action.payload
            const findedElement = state.allTodo.find((todo) => todo.id === id )
            if(findedElement) {
                findedElement.isChecked = true
            }
        },
        removeCheckedProps: (state, action) => {
            const {id} = action.payload
            const findedElement = state.allTodo.find((todo) => todo.id === id )
            if(findedElement) {
                findedElement.isChecked = false
            }
        },
    },
    
})


const {reducer: todoReducer, actions} = slice;

const todoActions = {
    ...actions
}

export {
    todoReducer,
    todoActions
}