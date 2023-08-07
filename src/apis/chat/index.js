import instance from "..";

const getChat = async (userId) => {
  const res = await instance.get(`/chat/${userId}`);
  return res.data;
};

const sendChat = async (chatId, msg) => {
  const res = await instance.post(`/chat/send/${chatId}`, { msg });
  return res.data;
};

exports.getMyChats = async () => {
  const res = await instance.get("/chat");
  return res.data;
};

export { getChat, sendChat };
