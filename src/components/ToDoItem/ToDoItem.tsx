import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setMarkedTodo, removeTodo, updateTodo  } from '../../store/reducers/todoSlice';
import { IToDoItem } from './TodoItem.interface';

const ToDoItem: FC<IToDoItem> = ({ title, completed, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [input, setInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);
  const [tempValue, setTempValue] = useState<string>(title);

  const onClickMarked = (id: number) => {
    dispatch(setMarkedTodo({id}));
  };

  const onClickRemove = (id: number) => {
    dispatch(removeTodo({id}));
  };

  const toggleEdit = () => {
    setInput(!input);
    setTempValue(!input ? value : '');
  };

  return (
    <div className="row px-3 align-items-center todo-item rounded">
      <div
        className="col-auto m-1 p-0 d-flex align-items-center"
        onClick={() => onClickMarked(id)}
      >
        <h2 className="m-0 p-0">
          <i
            className={`fa fa-square-o text-primary btn m-0 p-0 ${completed ? 'd-none' : ''}`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Отметить выполненным"
          ></i>
          <i
            className={`fa fa-check-square-o text-primary btn m-0 p-0 ${!completed ? 'd-none' : ''}`}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Отметить заданием на выполнение"
          ></i>
        </h2>
      </div>
      <div className="col px-1 m-1 d-flex align-items-center">
        <input 
          type="text" 
          className={`form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 ${input ? 'd-none' : ''}`} 
          value={value} 
          title={value} 
        />
        <input
          type="text"
          className={`form-control form-control-lg border-0 edit-todo-input rounded px-3 ${!input ? 'd-none' : ''}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            const target = e.target as HTMLInputElement;

            if (e.code === 'Enter') {
              setInput(false);
              dispatch(updateTodo({ id, title: target.value }))
            }

            if (e.code === 'Escape') {
              setInput(false);
              setValue(tempValue);
              setTempValue('');
            }
          }
          }
        />
      </div>
      <div className="col-auto m-1 p-0 px-3 d-none">
      </div>
      <div className="col-auto m-1 p-0 todo-actions">
        <div className="row d-flex align-items-center justify-content-end">
          <h5
            className="m-0 p-0 px-2"
            onClick={toggleEdit}
          >
            {!input
              ? <i className="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Редактировать"></i>
              : <i className="fa fa-check text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Редактировать"></i>
            }
          </h5>
          <h5
            className="m-0 p-0 px-2"
            onClick={() => onClickRemove(id)}
          >
            <i className="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Удалить"></i>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;