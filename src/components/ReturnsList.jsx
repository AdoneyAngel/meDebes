import { useEffect, useState } from "react"
import LocalData from "../model/localData"
import Return from "../model/Return"
import "../styles/returnsList.css"

export default function ReturnsList ({of}) {

    const [returnsList, setReturnsList] = new useState([])

    useEffect(() => {
        if (of === "to") {
            const userId = LocalData.getData("id")

            Return.getReturnsData_to(userId)
            .then(res => {
                setReturnsList(res)
            })

        } else if(of === "from") {
            const userId = LocalData.getData("id")

            Return.getReturnsData_from(userId)
            .then(res => {
                setReturnsList(res)
            })
        }
    }, [])

    return (
        <div id="returnsList" className={of === "to" ? "to" : "from"}>
            <h1>{of === "to" ? "Debes" : "Te deben"}</h1>
            {
                returnsList.map(currentData => {
                    return(
                        <div className="returnItem" key={currentData.id}>
                            <p className="returnName">{currentData.nickname}</p>
                            <p className="returnConcept">{currentData.concept}</p>
                            <div className="returnCost">{currentData.total}€</div>
                        </div>
                    )
                })
            }
            {
                returnsList.length == 0 ? <h2>Vacío</h2> : null
            }
        </div>
    )
}