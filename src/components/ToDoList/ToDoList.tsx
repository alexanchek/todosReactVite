import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IToDo } from '../../interfaces/IToDo.interface';
import { AppDispatch, RootState } from '../../store';
import ToDoItem from '../ToDoItem/ToDoItem';
import { IToDoList } from './ToDoList.interface';

const ToDoList: FC<IToDoList> = ({ todos }) => {
  return (
    <div className="row mx-1 px-5 pb-3 w-80">
      <div className="col mx-auto">
        {todos
          .map(todo => (
            <ToDoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
      </div>
    </div>
  );
};

export default ToDoList;