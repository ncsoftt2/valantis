import {createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {fetchIdsProduct, fetchProducts, fetchProductsBrand} from "../thunk/fetchIdsProduct";

type AppStatus = 'idle' | 'loading' | 'success' | 'failed'

export type ProductType = {
    brand: null | string
    price: number
    id: string
    product: string
}

type InitialStateType = {
    getIdsStatus: AppStatus
    getItemsStatus: AppStatus
    ids: string[]
    products: ProductType[]
    status: AppStatus
    brands: string[]
}

const initialState: InitialStateType = {
    getIdsStatus: 'idle',
    getItemsStatus: 'idle',
    ids: [] as string[],
    products: [] as ProductType[],
    status: 'idle',
    brands: []
}


const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchIdsProduct.pending, (state) => {
                state.ids = []
                state.getIdsStatus = 'loading'
            })
            .addCase(fetchProducts.pending, (state) => {
                state.getItemsStatus = 'loading'
            })
            .addCase(fetchIdsProduct.fulfilled, (state, action) => {
                state.ids = action.payload
                state.getIdsStatus = 'idle'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.getItemsStatus = 'idle'
                state.products = action.payload.filter(({id}, index, array) =>
                        index === array.findIndex((t) => (
                            t.id === id
                        ))
                )
            })
            .addCase(fetchProductsBrand.fulfilled, (state, action) => {
                const brandsFilter = action.payload.filter(b => b !== null)
                state.brands = brandsFilter.filter((item, index) => brandsFilter.indexOf(item) === index)
            })
            .addCase(fetchIdsProduct.rejected, (state,action) => {
                if(action.payload) {
                    toast.error(action.payload.message)
                }
                state.getIdsStatus = 'failed'
            })
            .addCase(fetchProducts.rejected, (state,action) => {
                if(action.payload) {
                    toast.error(action.payload.message)
                }
                state.getItemsStatus = 'failed'
            })
})

export const {reducer: productReducer} = slice
export const productThunk = {fetchIdsProduct, fetchProducts, fetchProductsBrand}
