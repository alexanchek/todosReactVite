import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IToDo } from '../../interfaces/IToDo.interface';
import { AppDispatch, RootState } from '../../store';
import { ISortType, setSortType, setTodos } from '../../store/reducers/todoSlice';

const Options = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortType, todos } = useSelector((state: RootState) => state.todos);
  const [memoTodos, setMemoTodos] = useState<IToDo[]>([]);

  useEffect(() => {
    console.log(memoTodos);
  }, [memoTodos])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortType(e.target.value as ISortType));

    if (memoTodos.length === 0) {
      setMemoTodos(todos);
    } 

    switch (e.target.value) {
      case 'active': 
        dispatch(setTodos(memoTodos.length === 0 ? todos.filter(todo => todo.completed === false) : memoTodos.filter(todo => todo.completed === false)))
        break;
        case 'completed': 
        console.log('completed');
        dispatch(setTodos(memoTodos.length === 0 ? todos.filter(todo => todo.completed === true) : memoTodos.filter(todo => todo.completed === true)))
        break;
      case 'all':
        dispatch(setTodos(memoTodos));
        setMemoTodos([]);
      default:
        break;
    }
  }

  return (
    <>
      <div className="row m-1 p-3 px-5 justify-content-end">
        <div className="col-auto d-flex align-items-center">
          <label className="text-secondary my-2 pr-2 view-opt-label">Filter</label>
          <select className="custom-select custom-select-sm btn my-2"

            onChange={onChange}
          >
            <option value="all">Все</option>
            <option value="completed">Завершенные</option>
            <option value="active">Активные</option>
            {/* <option value="has-due-date">Has due date</option> */}
          </select>
        </div>
        <div className="col-auto d-flex align-items-center px-1 pr-3">
          <label className="text-secondary my-2 pr-2 view-opt-label">Sort</label>
          <select className="custom-select custom-select-sm btn my-2">
            <option value="added-date-asc">Added date</option>
            <option value="due-date-desc">Due date</option>
          </select>
          <i className="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1" data-toggle="tooltip" data-placement="bottom" title="Ascending"></i>
          <i className="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 d-none" data-toggle="tooltip" data-placement="bottom" title="Descending"></i>
        </div>
      </div>
    </>
  );
};

export default Options;