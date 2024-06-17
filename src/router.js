import { createBrowserRouter } from "react-router-dom"

//Views
import Access from "./view/access/Access.jsx"
import Login from "./view/access/Login.jsx"
import SignUp from "./view/access/SignUp.jsx"

const router = createBrowserRouter([
    {
        path: "/access",
        element: <Access />,
        basename: "access",
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <SignUp />
            }
        ]
    }
])

export default router