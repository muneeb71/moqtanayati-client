import api from '../axios';

export const createChat = async (otherUserId) => {
  const response = await api.post('/chats', { otherUserId });
  return response.data;
}; 