import api from "./axios";

const signupApi = async (name, email, password) => {
  const res = await api.post("/auth/sign-up", { name, email, password });
  return res.data
};

const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data
};

const googleLoginApi = async (idToken) => {
  const res = await api.post("/auth/google-login", { idToken });
  return res.data
};

const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data
};

export { signupApi, loginApi, googleLoginApi, logoutApi }