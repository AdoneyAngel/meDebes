import { useEffect, useState } from "react"
import PopUp from "./PopUp"
import Return from "../../model/Return"
import "../../styles/returnInfo.css"

export default function ReturnInfo ({id, close}) {

    const [data, setData] = new useState({})

    const loadReturnData = async () => {
        if (id) {
            Return.getReturnData(id)
            .then (res => {
                setData(res)
            })
        }
    }

    useEffect(() => {
        loadReturnData()
    }, [])

    return (
        <PopUp onClick={close}>
            {
                data ? (

                <div id="returnInfo">
                    <h1>{data.concept}</h1> 

                    <section className="usersContent">
                        <div className="user"><p className="userHead">Envía</p>Prueba nombre</div>
                        <div className="user"><p className="userHead">Recibe</p>Nombre</div>
                    </section>            
                </div>

                ) : null
            }
        </PopUp>
    )
}