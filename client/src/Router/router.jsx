import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div className="w-full h-screen bg-black text-white">hello</div>
    },
    {
        path: 'login',
        element: <div className="w-full h-screen bg-black text-white">login</div>
    }
])

export default router;