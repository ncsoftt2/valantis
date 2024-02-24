import { configureStore } from "@reduxjs/toolkit"
import { productReducer } from "./features/products/slice/slice"
import {appReducer} from "./app.reducer";

export const store = configureStore({
    reducer: {
        app: appReducer,
        products: productReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch