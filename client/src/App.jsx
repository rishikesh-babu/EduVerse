import { RouterProvider } from "react-router-dom"
import router from "./Router/router"
import { ToastContainer } from "react-toastify"

function App() {


    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" />
        </>
    )
}

export default App
