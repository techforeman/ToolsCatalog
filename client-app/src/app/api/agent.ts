import { configure } from '@testing-library/react';
import axios, {AxiosResponse } from 'axios'
import { config } from 'process';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ITool } from '../models/tool';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response)
    {
        toast.error('Network Error  - server stop running');
    }
    const {status, data, config} = error.response;
    if(status === 404)
    {
        history.push('/notfound')
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
    {
        history.push('/notfound');
    }
    if(status === 500)
    {
        toast.error('Server error - please check terminal for more information about that issue.')
    }
    throw error.response;

})

const responseBody = (response: AxiosResponse) => response.data;

const sleep =(ms: number) => (response: AxiosResponse) => 
new Promise<AxiosResponse>(resolve => setTimeout(()=> resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)

}

const Tools = {
    list: (): Promise<ITool[]> => requests.get('/tools'),
    details: (id: string) => requests.get(`/tools/${id}`),
    create: (tool: ITool) => requests.post('/tools', tool),
    update: (tool: ITool) => requests.put(`/tools/${tool.id}`, tool),
    delete: (id: string) => requests.del(`/tools/${id}`)
}

const User = {
    current: ():Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
}

export default ({Tools, User})