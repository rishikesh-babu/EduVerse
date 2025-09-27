import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./UserLayout";
import Home from "../Pages/User/Home";
import Login from "../Pages/Shared/Login";
import Signup from "../Pages/Shared/Signup";
import ErrorElement from "../Components/Shared/ErrorElement";
import About from "../Pages/User/About";
import Chat from "../Pages/Shared/Chat";
import UserProtectedLayout from "./UserProtectedLayout";
import AdminLayout from "./AdminLayout";
import AdminHome from "../Pages/Admin/AdminHome";
import CreateClass from "../Pages/Admin/CreateClass";
import CreateSubject from "../Pages/Admin/CreateSubject";

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
            },
            {
                path: 'user',
                element: <UserProtectedLayout />,
                children: [
                    {
                        path: 'chat',
                        element: <Chat />
                    }
                ]
            }
        ]
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <AdminHome />
            },
            {
                path: "createclass",
                element: <CreateClass />
            },
            {
                path: "createsubject",
                element: <CreateSubject/>
            },
        ]

    }
])

export default router;