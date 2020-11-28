import axios from 'axios';

export const baseURL = 'https://science.creativityprojectcenter.ru/';

/**
 * @type {AxiosInstance}
 */
export default axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
