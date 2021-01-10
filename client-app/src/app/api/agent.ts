import axios, {AxiosResponse } from 'axios'
import { ITool } from '../models/tool';

axios.defaults.baseURL = 'https://localhost:5001/api';

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

export default ({Tools})