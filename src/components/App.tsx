import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { getTodosList } from '../store/actions/getTodos'
import CreateToDo from './CreateToDo/CreateToDo'
import Header from './Header/Header'
import Options from './Options/Options'
import ToDoList from './ToDoList/ToDoList'

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodosList());
  }, []);

  return (
      <div className="App">
        <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
          <Header title='Мой список дел' />
          <CreateToDo />
          <Options />
          <div className="p-2 mx-4 border-black-25 border-bottom"></div>
          <ToDoList todos={todos} />
        </div>
      </div>
  )
}

export default App
