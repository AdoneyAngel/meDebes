import { createBrowserRouter } from "react-router-dom"

//Views
import Access from "./view/access/Access.jsx"
import Login from "./view/access/Login.jsx"

const router = createBrowserRouter([
    {
        path: "/access",
        element: <Access />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    }
])

export default router