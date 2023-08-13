import instance from "..";

const getAllTags = async () => {
  const res = await instance.get("/tags");
  return res.data;
};

export { getAllTags };
