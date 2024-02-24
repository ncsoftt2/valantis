import {instance} from "src/api/instance";

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
        return instance.post('',payload)
    },
    fetchItems(payload: GetIdsPayload<{ ids: string[] }>) {
        return instance.post('', payload)
    },
    fetchBrands(payload: GetIdsPayload<{field: string}>) {
        return instance.post('',payload)
    }
}