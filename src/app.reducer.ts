import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {fetchIdsProduct, fetchProducts} from "src/features/products/thunk/fetchIdsProduct";

export type AppStatus = 'loading' | 'idle' | 'success' | 'failed'

type InitialStateType = {
    status: AppStatus
}

const initialState: InitialStateType = {
    status: 'idle'
}


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(
                isPending(fetchProducts),
                (state) => {
                    state.status = 'loading'
                })
            .addMatcher(
                isRejected(fetchProducts),
                (state) => {
                    state.status = 'failed'
                })
})

export const {reducer: appReducer, actions: appActions} = slice