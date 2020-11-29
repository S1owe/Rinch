import http from '../services/httpService';

export const getGraph = () => http.get('/api/api.php?module=main_graph&theme=4').then(({ data }) => data);

export const getUsersArticles = (user_1, user_2) => http
  .post('/api/api.php', {
    module: 'graph_edge',
    user_1: user_1,
    user_2: user_2,
  })
  .then(({ data }) => data);