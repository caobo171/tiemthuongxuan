
import {default as axios, AxiosPromise} from "axios";
class Fetch {

    __baseUrl:string  =  '/';
    get<ResponseType>(url: string): Promise<AxiosPromise<ResponseType>>{
        return axios.get(`${this.__baseUrl}${url}`);
    }

    post<ResponseType>(url:string, params: Object ): Promise<AxiosPromise<ResponseType>>{
        return axios.post(`${this.__baseUrl}${url}`,params);
    }

    delete<ResponseType>(url:string ): Promise<AxiosPromise<ResponseType>>{
        return axios.delete(`${this.__baseUrl}${url}`);
    }

    put<ResponseType>(url:string, params: Object ): Promise<AxiosPromise<ResponseType>>{
        return axios.put(`${this.__baseUrl}${url}`,params);
    }
}

export default new Fetch()