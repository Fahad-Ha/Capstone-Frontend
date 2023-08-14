import instance from "..";

const getEvents = async () => {
  const res = await instance.get("/events/");
  return res.data.reverse();
};
const getEventById = async (id) => {
  const res = await instance.get(`/events/${id}`);
  return res.data;
};
const rsvp = async (id) => {
  const res = await instance.put(`/events/${id}`);
  return res.data;
};
const removeRSVP = async (id) => {
  const res = await instance.put(`/events/${id}/removeRSVP`);
  return res.data;
};
//get suggested events

const createEvent = async (data) => {
  data.date = `${data.date}`;
  data.from = `${data.from}`;
  data.to = `${data.to}`;

  const formData = new FormData();

  for (const key in data) {
    if (key === "location") {
      formData.append("latitude", data.location.latitude);
      formData.append("longitude", data.location.longitude);
    } else if (key === "image") {
      formData.append("image", {
        name: data.image,
        type: "image/jpeg",
        uri: data.image,
      });
    } else if (key === "tags") {
      data.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
    } else {
      formData.append(key, data[key]);
    }
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

export { createEvent, getEvents, getEventById, deleteEvent, rsvp, removeRSVP };
