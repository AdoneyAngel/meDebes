import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

import "../../styles/access.css"

import router from "../../router";

//Components

function Access() {

    const routeNavigation = useNavigate()

    //Si se encuentra en la raiz de "Acces", se direcciona automaticamente al login

    useEffect(() => {
        if (router.state.location.pathname === "/access") {
            routeNavigation("login")
        }
    }, [])

    return (
        <div id="accessView">
            <div className="whiteBackground"></div>
            <div className="accessContent">
               <Outlet/> 
            </div>
        </div>
    )
}

export default Access;