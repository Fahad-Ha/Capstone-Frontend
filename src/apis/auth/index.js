import instance from "..";

const login = async (userInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  return res.data;
};

const register = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    } else {
      formData.append("image", {
        name: userInfo.image,
        type: "image/jpeg",
        uri: userInfo.image,
      });
    }
  }

  const res = await instance.post("/auth/register", formData, {
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

const getAllUsers = async () => {
  const res = await instance.get("/auth/users");
  return res.data;
};
export { register, login, getAllUsers };
