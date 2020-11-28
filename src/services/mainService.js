import http from './httpService';

export default () => http.get('/api/api.php?module=departments').then(({ data }) => data);