import { useEffect, useState } from "react"
import LocalData from "../model/localData"
import Return from "../model/Return"
import "../styles/returnsList.css"
import LoadingIcon from "./LoadingIcon"

export default function ReturnsList ({of, onClick}) {

    const [returnsList, setReturnsList] = new useState([])
    const [loadingList, setLoadingList] = new useState(true)

    useEffect(() => {
        setLoadingList(true)

        if (of === "to") {
            const userId = LocalData.getData("id")

            Return.getReturnsData_to(userId)
            .then(res => {
                setReturnsList(res)
                setLoadingList(false)
            })

        } else if(of === "from") {
            const userId = LocalData.getData("id")

            Return.getReturnsData_from(userId)
            .then(res => {
                setReturnsList(res)
                setLoadingList(false)
            })
        }
    }, [])

    return (
        <>
        {
            returnsList.length && !loadingList ? (
                <div id="returnsList" className={of === "to" ? "to" : "from"}>
                    <h1>{of === "to" ? "Debes" : "Te deben"}</h1>
                    {
                        returnsList.map(currentData => {
                            return(
                                <div onClick={() => onClick(currentData.id)} className="returnItem" key={currentData.id}>
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
            ) : loadingList ? <LoadingIcon /> : null
        }
        </>

    )
}