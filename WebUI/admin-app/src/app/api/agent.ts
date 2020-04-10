import axios, { AxiosResponse } from 'axios';
import { ISportObject } from '../models/sportObject';
import { history } from '../..';

axios.defaults.baseURL = 'http://localhost:5000/api';

// TODO: jwt token configuration
// axios.interceptors.request.use(
//   (config) => {
//     const token = window.localStorage.getItem('jwt');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(undefined, (error) => {
  const { status } = error.response;

  if (status === 404) {
    history.push('/notfound');
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// ! use this?
// da se uspori komunikacija sa API, ne koristi se za production, samo u development
// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>(resolve =>
//     setTimeout(() => resolve(response), ms)
//   );

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const SportObjects = {
  list: (): Promise<ISportObject[]> => requests.get('/sportobjects'),
  details: (id: number) => requests.get(`/sportobjects/${id}`),
  create: (sportObject: ISportObject) =>
    requests.post('/sportobjects', sportObject),
  update: (sportObject: ISportObject) =>
    requests.put(`/sportobjects/${sportObject.id}`, sportObject),
  delete: (id: number) => requests.del(`/sportobjects/${id}`),
};

export default {
  SportObjects,
};
