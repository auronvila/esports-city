import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay );
    })
}


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use( async response => {
    return sleep(600).then(() => {
        return response;
    }).catch(error => {
        console.log(error);
        return Promise.reject(error);
    })
})

const responsebody = <T> (response : AxiosResponse <T>) => response.data;

const requests = {
    get : <T> (url : string) => axios.get<T>(url).then(responsebody),
    post : <T> (url : string, body : {}) =><T> axios.post(url, body).then(responsebody),
    put : <T> (url : string, body : {}) => <T> axios.put(url, body).then(responsebody),
    del : <T> (url : string) => <T> axios.delete(url).then(responsebody)
}

const Activities = {
    list : () => requests.get<Activity[]>('/activities'),
    details : (id: string) => requests.get<Activity>(`/activities/${id}`),
    create : (activity: Activity) => axios.post<void>('/activities',activity),
    update : (activity : Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
    delete : (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;