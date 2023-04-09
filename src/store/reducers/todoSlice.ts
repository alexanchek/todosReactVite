import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IToDo } from "../../interfaces/IToDo.interface";
import { getTodosList } from "../actions/getTodos";

export type ISortType = 'active' | 'completed' | 'all';

interface IToDoState {
  todos: IToDo[];
  sortType: ISortType;
  loading: boolean;
  error: string;
}

const initialState: IToDoState = {
  todos: [],
  sortType: "all",
  loading: false,
  error: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setMarkedTodo: (state, action: PayloadAction<{id: number}>) => {
      const currentTodo = state.todos.find(item => item.id === action.payload.id);
      
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<{id: number}>) => {
      const findedIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      state.todos = [ ...state.todos.slice(0, findedIndex), ...state.todos.slice(findedIndex + 1)];
    },
    addTodo: (state, action: PayloadAction<IToDo>) => {
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action: PayloadAction<{id: number, title: string}>) => {
      const updatedTodo = state.todos.find(todo => todo.id === action.payload.id);
      
      if (updatedTodo) {
        updatedTodo.title = action.payload.title;
      }
    },
    setSortType: (state, action: PayloadAction<ISortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosList.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getTodosList.fulfilled, (state, action: PayloadAction<IToDo[]>) => {
        state.loading = false;
        state.todos = action.payload.slice(0, 10);
      })
      .addCase(getTodosList.rejected, state => {
        state.loading = false;
        state.error = 'Произошла ошибка при загрузке данных';
      })
  }
});

export const {
  addTodo,
  updateTodo,
  setMarkedTodo,
  removeTodo,
  setSortType,
} = todoSlice.actions;

export default todoSlice.reducer;

export const selectAllTodos = (state: RootState) => state.todos.todos;