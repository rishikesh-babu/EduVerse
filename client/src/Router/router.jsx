import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "../Pages/User/Home";
import Login from "../Pages/Shared/Login";
import Signup from "../Pages/Shared/Signup";
import ErrorElement from "../Components/Shared/ErrorElement";
import About from "../Pages/User/About";

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
            },
            {
                path: 'about', 
                element: <About />
            },
            {
                path: 'signup', 
                element: <Signup />
            }
        ]
    },
])

export default router;