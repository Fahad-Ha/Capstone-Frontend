import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.log("Error while trying to save token", error);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const decoded = jwt_decode(token);
      const cureentTime = Date.now() / 1000;
      if (decoded.exp < cureentTime) {
        SecureStore.removeItemAsync("token");
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log("Error while trying to get the token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.log("Error while trying to delete the token", error);
  }
};

export { saveToken, getToken, removeToken };
