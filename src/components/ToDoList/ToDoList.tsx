import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IToDo } from '../../interfaces/IToDo.interface';
import {  RootState } from '../../store';
import { selectAllTodos } from '../../store/reducers/todoSlice';
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = () => {
  const todos = useSelector(selectAllTodos);

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