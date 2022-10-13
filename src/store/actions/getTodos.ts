import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos } from "../../services/todoApi.service";

export const getTodosList = createAsyncThunk(
  'todo/getTodos',
  async (_, thunkApi: any) => {
    try {
      const todos = await getTodos();
      return todos;
    } catch (e) {
      return thunkApi.rejectWithValue('Загрузка не удалась');
    }
  }
);