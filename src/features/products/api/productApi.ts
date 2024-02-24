import {instance} from "src/api/instance";

type GetIdsPayload<T> = {
    action: string
    params: T
}

type PayloadArgs = {
    offset?: number
    limit?: number
} & { product?: string }
    | { price?: number }
    | {brand?: string}

export const productApi = {
    fetchIds(payload:GetIdsPayload<PayloadArgs>) {
        return instance.post('http://api.valantis.store:40000/',payload)
    },
    fetchItems(payload: GetIdsPayload<{ ids: string[] }>) {
        return instance.post('http://api.valantis.store:40000/', payload)
    },
    fetchBrands(payload: GetIdsPayload<{field: string}>) {
        return instance.post('http://api.valantis.store:40000/',payload)
    }
}