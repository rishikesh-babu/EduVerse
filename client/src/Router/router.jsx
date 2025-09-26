import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />, 
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