import { createBrowserRouter } from "react-router-dom"

//Views
import Access from "./view/access/Access.jsx"
import Login from "./view/access/Login.jsx"
import SignUp from "./view/access/SignUp.jsx"
import Main from "./view/main/Main.jsx"
import Contacts from "./view/main/Contacts.jsx"

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
    },
    {
        path: "/",
        element: <Main />,
        basename: "main"
    },
    {
        path: "/contacts",
        element: <Contacts />,
        basename: "contacts"
    }
])

export default router