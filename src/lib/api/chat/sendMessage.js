import api from '../axios';

export const sendMessage = async (id, content, chatId) => {
  const response = await api.post(`/chats/${id}/messages`, { content, chatId });
  return response.data;
}; 