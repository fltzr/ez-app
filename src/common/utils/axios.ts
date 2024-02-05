import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.155:3000',
  withCredentials: true,
});
