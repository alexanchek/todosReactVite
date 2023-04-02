import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToDo, IToDoSlice } from "../../interfaces/IToDo.interface";
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
    setTodos: (state, action: PayloadAction<IToDo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<IToDo>) => {
      state.todos = [action.payload, ...state.todos];
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
  setTodos,
  addTodo,
  setSortType,
} = todoSlice.actions;

export default todoSlice.reducer;