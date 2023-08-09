import instance from "..";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "..";

const getEvents = async () => {
  const res = await instance.get("/events/");
  return res.data.reverse();
};
const getEventById = async (id) => {
  const res = await instance.get(`/events/${id}`);
  return res.data;
};

const createEvent = async (data) => {
  const token = await SecureStore.getItemAsync("token");
  const instance = axios.create({
    baseURL: BASE_URL + "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const formData = new FormData();

  for (const key in data) {
    if (key === "location") {
      formData.append("location.latitude", data.location.latitude);
      formData.append("location.longitude", data.location.longitude);
    } else if (key !== "image") {
      formData.append(key, data[key]);
    } else {
      formData.append("image", {
        name: data.image,
        type: "image/jpeg",
        uri: data.image,
      });
    }
  }
  if (data.date instanceof Date) {
    formData.append("date", data.date);
  } else {
    // Handle the case when data.date is not a valid Date object
    console.error("Invalid date format:", data.date);
  }
  const res = await instance.post("/events/createEvent", formData, {
    headers: {
      Accept: "application/json. text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const deleteEvent = async (id) => {
  const res = await instance.delete(`/events/${id}`);
  return res.data;
};

export { createEvent, getEvents, getEventById, deleteEvent };
