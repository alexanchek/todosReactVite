import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addTodo } from '../../store/reducers/todoSlice';

const CreateToDo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [todoValue, setTodoValue] = useState<string>('');

  const onClick = () => {
    if (todoValue === '') {
      return;
    }

    dispatch(addTodo({title: todoValue, completed: false, id: Math.floor(Math.random() * 100000000000)}));
    setTodoValue('');
  };

  return (
    <div className="row m-1 p-3">
      <div className="col col-11 mx-auto">
        <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
          <div className="col">
            <input 
              className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" 
              type="text" 
              placeholder="Добавить новое" 
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  onClick();
                }
              }}
              />
          </div>
          {/* <div className="col-auto m-0 px-2 d-flex align-items-center">
            <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
            <i className="fa fa-calendar my-2 px-1 text-primary btn due-date-button" data-toggle="tooltip" data-placement="bottom" title="Set a Due date"></i>
            <i className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none" data-toggle="tooltip" data-placement="bottom" title="Clear Due date"></i>
          </div> */}
          <div className="col-auto px-0 mx-0 mr-2">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onClick}
              >Добавить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateToDo;