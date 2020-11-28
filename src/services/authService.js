import http from './httpService';

export const loginUser = (login, password) => http.post('/api/api.php', {
  module: 'auth',
  login,
  password
}).then(({ data }) => data);

export const checkUser = (token) => http.get(`/api/api.php?module=check_auth&PHPSESSID=${token}`);

export const logoutUser = () => http.post('/api/api.php', {
  module: 'logout',
});