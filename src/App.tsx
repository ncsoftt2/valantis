import {Route, Routes} from "react-router-dom";
import {ProductPage} from "src/page/ProductPage";
import React from "react";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<ProductPage />} />
            </Routes>
        </>
    )
}
