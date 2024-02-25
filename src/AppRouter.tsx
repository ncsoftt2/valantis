import {createBrowserRouter} from "react-router-dom"
import { App } from "./App"
import {ProductPage} from "src/page/ProductPage";

export enum AppRouter {
    MAIN = 'main',
}

export const RoutePath:Record<AppRouter, string> = {
    [AppRouter.MAIN]: '/',
}

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: RoutePath.main,
                element: <ProductPage/>

            },
        ]
    }
])
