import { createContext, useState, useEffect } from "react";
import {
  googleLoginApi,
  loginApi,
  logoutApi,
  signupApi,
} from "../services/authServices.js";
import { getMeApi } from "../services/userService.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setLoading(true);
      const getMe = async () => {
        try {
          const res = await getMeApi();
          if (res.success) {
            setUser(res.data);
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } finally {
          setLoading(false);
        }
      };
      getMe();
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await signupApi(name, email, password);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      if (res.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const google = async (idToken) => {
    setLoading(true);
    try {
      const res = await googleLoginApi(idToken);
      if (res.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      // Logout is local state cleanup as well; it must work even if the
      // access token has expired and the API rejects the logout request.
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        signUp,
        login,
        google,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
