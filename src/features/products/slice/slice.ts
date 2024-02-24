import {createSlice} from "@reduxjs/toolkit";
import {fetchIdsProduct, fetchProducts, fetchProductsBrand} from "../thunk/fetchIdsProduct";

type AppStatus = 'idle' | 'loading' | 'success' | 'failed'

export type ProductType = {
    brand: null | string
    price: number
    id: string
    product: string
}

type InitialStateType = {
    ids: string[]
    products: ProductType[]
    status: AppStatus
    brands: string[]
}

const initialState: InitialStateType = {
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
            .addCase(fetchIdsProduct.fulfilled, (state, action) => {
                state.ids = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                if (action.payload) {
                    state.products = action.payload.filter(({id}, index, array) =>
                            index === array.findIndex((t) => (
                                t.id === id
                            ))
                    )
                }
            })
            .addCase(fetchProductsBrand.fulfilled,(state, action) => {
                const brands = action.payload.filter(b => b !== null)
                state.brands = brands.filter((item, index) => brands.indexOf(item) === index)
            })
})

export const {reducer: productReducer} = slice
export const productThunk = {fetchIdsProduct, fetchProducts,fetchProductsBrand}
