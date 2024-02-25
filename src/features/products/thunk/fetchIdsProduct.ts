import {createAsyncThunk} from "@reduxjs/toolkit";
import {productApi} from "../api/productApi";
import {ProductType} from "../slice/slice";

type PayloadType = {
    action: string
    params: {
        offset?: number
        limit?: number
    } & { [key:string]: string | number}
}

export const fetchIdsProduct = createAsyncThunk<string[], PayloadType>(
    'product/fetchIdsProduct',
    async (payload, {rejectWithValue}) => {
        try {
            const res = await productApi.fetchIds(payload)
            return res.data.result
        } catch (e) {
            console.log('THUNK FETCH IDS CATCH')
            console.log(e)
            return rejectWithValue({message: e})
        }
    }
)

export const fetchProducts = createAsyncThunk<ProductType[], string[]>(
    'product/fetchProducts',
    async (arg, {rejectWithValue}) => {
        try {
            const payloadData = {
                action: 'get_items',
                params: {limit: 50, offset: 0, ids: arg }
            }
            const res = await productApi.fetchItems(payloadData)
            return res.data.result
        } catch (e) {
            console.log('THUNK FETCH PRODUCTS CATCH')
            console.log(e)
            return rejectWithValue({message: e})
        }
    }
)

export const fetchProductsBrand = createAsyncThunk<string[],void>(
    'product/fetchProductsBrand',
    async (_, {rejectWithValue}) => {
        try {
            const payload = {
                action:'get_fields',
                params: {
                    field: 'brand',
                }
            }
            const res = await productApi.fetchBrands(payload)
            return res.data.result
        } catch (e) {
            console.log(e)
            return rejectWithValue({message:e})
        }
    }
)

