import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './reducers/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
    devTools: import.meta.env.DEV ? true : false,

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
