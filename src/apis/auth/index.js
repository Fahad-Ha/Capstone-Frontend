import instance from "..";

const login = async (userInfo, expoPushToken) => {
  const res = await instance.post("/auth/login", userInfo, expoPushToken);
  return res.data;
};

//in the register tags(from mulitselect) should be an array of strings and send to the backend

const register = async (userInfo) => {
  const formData = new FormData();
  // console.log("here from auth =====>", userInfo);

  for (const key in userInfo) {
    if (key != "image") {
      if (key === "interests") {
        userInfo.interests.forEach((interest) => {
          formData.append("interests", interest);
        });
      } else {
        formData.append(key, userInfo[key]);
      }
    } else {
      formData.append("image", {
        name: userInfo.image,
        type: "image/jpeg",
        uri: userInfo.image,
      });
    }
  }

  // formData.append("expoPushToken", expoPushToken);

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

const getProfileData = async () => {
  const res = await instance.get("/auth/my-profile");
  return res.data;
};

const checkUsername = async (username) => {
  const res = await instance.post("/auth/checkusername", {
    username: `${username}`,
  });
  return res.data;
};

const checkEmail = async (email) => {
  const res = await instance.post("/auth/checkemail", {
    email: `${email}`,
  });

  //res should be true or false
  return res.data;
};
export {
  register,
  login,
  getAllUsers,
  getProfileData,
  checkUsername,
  checkEmail,
};
