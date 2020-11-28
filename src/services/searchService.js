import http from './httpService';

export default (query) => http.get(`api/api.php?module=search&query=${query}`).then(({ data: { users } }) => users);