import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import MainLayout from "../Layout/MainLayout";

const myCreateRoute = createBrowserRouter[
    {
        Path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                Path: '/',
                element: <Home></Home>
            }
        ]
    }
]
export default myCreateRoute;