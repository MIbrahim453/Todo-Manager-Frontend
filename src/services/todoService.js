import api from "./axios";

const createTodoApi = async (todoData) => {
  const res = await api.post("/todo/create-todo", todoData);
  return res.data;
};

const editTodoApi = async (todoId, todoData) => {
  const res = await api.put(`/todo/edit-todo/${todoId}`, todoData);
  return res.data;
};

const deleteTodoApi = async (todoId) => {
  const res = await api.delete(`/todo/delete-todo/${todoId}`);
  return res.data;
};

const shareTodoApi = async (todoId, userIds) => {
  const res = await api.post(`/todo/share-todo/${todoId}`, { userIds });
  return res.data;
};

const getTodosApi = async (params = {}) => {
  const res = await api.get("/todo/my-todos", { params });
  return res.data;
};

const getAllTodosApi = async (params = {}) => {
  const res = await api.get("/todo/all-todos", { params });
  return res.data;
};

const getSharedTodosApi = async () => {
  const res = await api.get("/todo/shared-todos");
  return res.data;
};

const markCompletedApi = async (todoId, status = "completed") => {
  const res = await api.put(`/todo/mark-completed/${todoId}`, { status });
  return res.data;
};

const markSharedCompletedApi = async (todoId, status = "completed") => {
  const res = await api.put(`/todo/mark-shared-completed/${todoId}`, { status });
  return res.data;
};

export {
  createTodoApi,
  editTodoApi,
  deleteTodoApi,
  shareTodoApi,
  getTodosApi,
  getAllTodosApi,
  getSharedTodosApi,
  markCompletedApi,
  markSharedCompletedApi,
};
