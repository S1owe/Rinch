import http from './httpService';

export const getActivityData= () => http.get('/api/api.php').then(({data}) => data);