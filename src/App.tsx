import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from "react-router-dom";
import "./App.scss"
import RootToDo from './components/RootToDo';
import NotFoundPage from './components/NotFoundPage';
import AllTodoList from "./components/RootToDo/AllToDo/AllTodoList";
import DeletedToDo from "./components/RootToDo/DeletedToDo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route
          element={<RootToDo />}
          path="/"
        >
          <Route index element={<Navigate to="allToDo" />} />
          <Route path="allToDo" element={<AllTodoList/>}/>
          <Route path="deletedToDo" element={<DeletedToDo/>} />
        </Route>
       <Route path="*" element={<NotFoundPage />} />

    </>,
  ),
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
