import http from './httpService';

export default (id, start, end, type, cit) => {
  console.log(id)
  return http.post('api/api.php', {
    module: 'user_info',
    id,
    start,
    end,
    type,
    cit,
  }).then(({ data }) => data);
}