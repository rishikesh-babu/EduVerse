import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ErrorElement from "../Components/ErrorElement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <ErrorElement />, 
        children: [
            {
                path: '/', 
                element: <Home />
            }, 
            {
                path: 'login', 
                element: <Login />
            }
        ]
    },
])

export default router;