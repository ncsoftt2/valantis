import { configureStore } from "@reduxjs/toolkit"
import { productReducer } from "./features/products/slice/slice"

export const store = configureStore({
    reducer: {
        products: productReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch