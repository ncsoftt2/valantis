import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const App = () => {
    return (
        <div>
            <Suspense>
                <Outlet />
            </Suspense>
        </div>
    )
}