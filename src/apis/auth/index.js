import instance from "..";

const login = async (userInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  return res.data;
};

const register = async (userInfo) => {
  const res = await instance.post("/auth/register", userInfo);
  return res.data;
};

const getAllUsers = async () => {
  const res = await instance.get("/auth/users");
  return res.data;
};
export { register, login, getAllUsers };
