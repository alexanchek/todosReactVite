import axios from "axios";
import { IToDo } from "../interfaces/IToDo.interface";

const getTodos = async() => {
  try {
    const { data } = await axios.get<IToDo[]>('https://jsonplaceholder.typicode.com/todos');
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}

export { getTodos };