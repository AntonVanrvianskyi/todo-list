import {createSlice} from "@reduxjs/toolkit";


interface IState {
    allTodo: string[]
    deletedTodo: string[]
}


const initialState: IState = {
    allTodo: [],
    deletedTodo: [],
}


const slice = createSlice({
    name: "todo-slice",
    initialState,
    reducers: {
        createNewToDo: (state, action) => {
            state.allTodo.push(action.payload)
        },
        deleteTodo: (state, action) => {
            const {isDeleted, index} = action.payload 
            if (!isDeleted){
                const deletedTodo = state.allTodo.splice(index, 1)
                state.deletedTodo.push(...deletedTodo)
            }  else {
                state.deletedTodo.splice(index, 1)
            }
        },
        updateTodo: (state, action) => {
            const {prevState, currentState} = action.payload
            const indexFindedTodo = state.allTodo.indexOf(prevState)
            state.allTodo.splice(indexFindedTodo, 1, currentState)
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