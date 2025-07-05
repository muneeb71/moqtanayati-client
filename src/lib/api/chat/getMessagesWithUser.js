import api from '../axios';

export const getMessagesWithUser = async (userBId) => {
  const response = await api.get(`/chat/with/${userBId}/messages`);
  return response.data; // { chat, messages }
}; 