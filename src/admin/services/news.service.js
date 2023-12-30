import { GET } from '../api/fetch-api';
import { API_URL } from '../configs/api.config';

export const newsService = {
  fetchNews: async () => {
    return GET(`${API_URL}/admin/news`);
  },
};
