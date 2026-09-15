import { useState, useContext } from "react";
import { createContext } from "react";
import { AuthContext } from "./authContext";
import {
  createTodoApi,
  editTodoApi,
  deleteTodoApi,
  shareTodoApi,
  markCompletedApi,
  markSharedCompletedApi,
  getTodosApi,
  getSharedTodosApi,
  getAllTodosApi,
} from "../services/todoService";
import { useEffect } from "react";

export const TodoContext = createContext(null);

const TodoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [sharedTodos, setSharedTodos] = useState([]);
  const [todoStats, setTodoStats] = useState({
    total: "",
    completed: "",
    pending: "",
    shared: "",
  });
  const [allTodoStats, setAllTodoStats] = useState({
    total: "",
    completed: "",
    pending: "",
    shared: "",
  });
  const [sharedTodoStats, setSharedTodoStats] = useState({
    total: "",
    completed: "",
    pending: "",
  });

  const getMyTodos = async () => {
    setLoading(true);
    try {
      const res = await getTodosApi();
      if (res.success) {
        setTodos(res.data.todos);
        setTodoStats({
          total: res.data.totalTodos,
          completed: res.data.completedTodos,
          pending: res.data.pendingTodos,
          shared: res.data.sharedTodos,
        });
      }
      return res;
    } catch (error) {
      if (error?.response?.status === 404) {
        setTodos([]);
        setTodoStats({ total: 0, completed: 0, pending: 0, shared: 0 });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyTodos();
    } else {
      setTodos([]);
      setTodoStats({ total: 0, completed: 0, pending: 0, shared: 0 });
    }
  }, [user]);

  const createTodo = async (data) => {
    setLoading(true);
    try {
      const res = await createTodoApi(data);
      if (res.success) {
        setTodos((prev) => [...prev, res.data]);
        getMyTodos();
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (todoId, data) => {
    setLoading(true);
    try {
      const res = await editTodoApi(todoId, data);
      if (res.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === todoId ? res.data : todo)),
        );
        getMyTodos();
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (todoId) => {
    setLoading(true);
    try {
      const res = await deleteTodoApi(todoId);
      if (res.success) {
        setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
        getMyTodos();
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shareTodo = async (todoId, userIds) => {
    setLoading(true);
    try {
      const res = await shareTodoApi(todoId, userIds);
      if (res.success) {
        console.log("Todo Shared Successfully");
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const markTodoCompleted = async (todoId, status = "completed") => {
    setLoading(true);
    try {
      const res = await markCompletedApi(todoId, status);
      if (res.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === todoId ? res.data : todo)),
        );
        getMyTodos();
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const markSharedTodoCompleted = async (todoId, status = "completed") => {
    setLoading(true);
    try {
      const res = await markSharedCompletedApi(todoId, status);
      if (res.success) {
        setSharedTodos((prev) =>
          prev.map((todo) =>
            todo.todoId?._id === todoId
              ? {
                  ...todo,
                  todoId: {
                    ...todo.todoId,
                    status: res.data.status,
                  },
                }
              : todo,
          ),
        );
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTodos = async () => {
    setLoading(true);
    try {
      const res = await getAllTodosApi();
      if (res.success) {
        setAllTodos(res.data.todos);
        setAllTodoStats({
          total: res.data.totalTodos,
          completed: res.data.completedTodos,
          pending: res.data.pendingTodos,
          shared: res.data.sharedTodos,
        });
      }
      return res;
    } catch (error) {
      if (error?.response?.status === 404) {
        setAllTodos([]);
        setAllTodoStats({ total: 0, completed: 0, pending: 0, shared: 0 });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getSharedTodos = async () => {
    setLoading(true);
    try {
      const res = await getSharedTodosApi();
      if (res.success) {
        setSharedTodos(res.data.sharedTodos);
        setSharedTodoStats({
          total: res.data.totalSharedTodos,
          completed: res.data.completedSharedTodos,
          pending: res.data.pendingSharedTodos,
        });
      }
      return res;
    } catch (error) {
      if (error?.response?.status === 404) {
        setSharedTodos([]);
        setSharedTodoStats({ total: 0, completed: 0, pending: 0 });
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        allTodos,
        sharedTodos,
        todoStats,
        allTodoStats,
        sharedTodoStats,
        loading,
        getMyTodos,
        createTodo,
        editTodo,
        deleteTodo,
        shareTodo,
        markTodoCompleted,
        markSharedTodoCompleted,
        getAllTodos,
        getSharedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
