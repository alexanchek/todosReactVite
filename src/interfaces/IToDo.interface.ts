import { Dispatch } from "react";

export interface IToDo {
  id: number;
  title: string;
  completed: boolean;
}

export interface IToDoSlice extends IToDo {
}