import api from "./axios";

const getMeApi = async () => {
  const res = await api.get("/user/me");
  return res.data;
};

const getAllUsersApi = async () => {
  const res = await api.get("/user/get-all-users");
  return res.data;
};

const recentUsersApi = async () => {
  const res = await api.get("/user/recent-users");
  return res.data;
};

const deleteUserApi = async (userId) => {
  const res = await api.delete(`/user/delete-user/${userId}`);
  return res.data;
};

const editProfileApi = async (userData) => {
  const res = await api.put("/user/edit-profile", userData);
  return res.data;
};

const uploadProfilePhotoApi = async (formData) => {
  const res = await api.put("/user/upload-profile-photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export {
  getMeApi,
  getAllUsersApi,
  recentUsersApi,
  deleteUserApi,
  editProfileApi,
  uploadProfilePhotoApi,
};
