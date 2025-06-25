import api from '../axios';

export const getConversations = async () => {
  const response = await api.get('/chats');
  return response.data;
}; 