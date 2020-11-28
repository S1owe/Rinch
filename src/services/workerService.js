import http from './httpService';

export const getWorker = ({ id, start, end, type, cit }) => http.post('api/api.php', {
  module: 'user_info',
  id,
  start,
  end,
  type,
  cit,
}).then(({ data }) => data);

export const getPublicationsTypes = () => http.get('api/api.php?module=get_articles_types').then(({ data }) => data);