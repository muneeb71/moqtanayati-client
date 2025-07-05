import api from '../axios';

export const createChat = async () => {
  const response = await api.get('/analytics/');
  console.log(response);
  
  return response.data;
}; 