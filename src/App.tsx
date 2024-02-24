import {Outlet, Route, Routes} from "react-router-dom";
import {ProductPage} from "src/page/ProductPage";
import {Suspense} from "react";

export const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<ProductPage />} />
            </Routes>
        </div>
    )
}


// export const App = () => {
//     return (
//         <div>
//             <Suspense>
//                 <Outlet />
//             </Suspense>
//         </div>
//     )
// }