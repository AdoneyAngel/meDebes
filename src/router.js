import { createBrowserRouter } from "react-router-dom"

//Views
import Access from "./view/access/Access.jsx"
import Login from "./view/access/Login.jsx"

const router = createBrowserRouter([
    {
        path: "/access",
        element: <Access />,
        basename: "access",
        children: [
            {
                path: "login",
                element: <Login />,
                basename: "login"
            }
        ]
    }
])

export default router