import { useState, useContext } from "react";
import { createContext } from "react";
import { AuthContext } from "./authContext";
import {
  getAllUsersApi,
  recentUsersApi,
  deleteUserApi,
  editProfileApi,
  uploadProfilePhotoApi,
} from "../services/userService";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [todoCountsPerUser, setTodoCountsPerUser] = useState([]);
  const [userTypeStats, setUserTypeStats] = useState({
    adminUsers: 0,
    memberUsers: 0,
  });
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsersApi();
      if (res.success) {
        setAllUsers(res.data.allUsers);
        setTodoCountsPerUser(res.data.todosPerUser);
        setUserTypeStats({
          adminUsers: res.data.adminUsers,
          memberUsers: res.data.memberUsers,
        });
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRecentUsers = async () => {
    setLoading(true);
    try {
      const res = await recentUsersApi();
      if (res.success) {
        setRecentUsers(res.data);
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const res = await deleteUserApi(userId);
      if (res.success) {
        setAllUsers((prev) => prev.filter((item) => item._id !== userId));
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (data) => {
    setLoading(true);
    try {
      const res = await editProfileApi(data);
      if (res.success) {
        setUser?.(res.data);
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePhoto = async (formData) => {
    setLoading(true);
    try {
      const res = await uploadProfilePhotoApi(formData);
      if (res.success) {
        setUser?.(res.data);
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        recentUsers,
        todoCountsPerUser,
        userTypeStats,
        loading,
        getAllUsers,
        getRecentUsers,
        deleteUser,
        editProfile,
        uploadProfilePhoto,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
