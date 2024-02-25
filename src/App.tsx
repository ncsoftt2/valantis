import { Route, Routes} from "react-router-dom";
import {ProductPage} from "src/page/ProductPage";

export const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<ProductPage />} />
            </Routes>
        </div>
    )
}
