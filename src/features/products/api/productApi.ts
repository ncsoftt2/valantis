import {instance} from "src/api/instance";
import axios from "axios";

type GetIdsPayload<T> = {
    action: string
    params: T
}

type PayloadArgs = {
    offset?: number
    limit?: number
} & { [key:string]: string | number}

export const productApi = {
    fetchIds(payload:GetIdsPayload<PayloadArgs>) {
        return axios.post('http://api.valantis.store:40000/',payload)
    },
    fetchItems(payload: GetIdsPayload<{ ids: string[] }>) {
        return axios.post('http://api.valantis.store:40000/', payload)
    },
    fetchBrands(payload: GetIdsPayload<{field: string}>) {
        return axios.post('http://api.valantis.store:40000/',payload)
    }
}