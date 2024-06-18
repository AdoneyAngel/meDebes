import "../../styles/paymentCircle.css"
import LocalData from "../../model/localData"
import { useEffect, useState } from "react"
import Return from "../../model/Return"

export default function PaymentCircle () {
    const [totalToReturnFrom, setTotalToReturnFrom] = new useState(0)
    const [totalToReturnTo, setTotalToReturnTo] = new useState(0)
    
    useEffect(() => {
        const userId = LocalData.getData("id")

        //Get total money current user must give
        Return.getTotalReturn_to(userId)
        .then(total => {
            setTotalToReturnTo(total)
        })
        
        //Get total money to return to current user
        Return.getTotalReturn_from(userId)
        .then(total => {
            setTotalToReturnFrom(total)
        })
    })

    return (
        <div id="paymentCircle">
            <div className="circleTop">
                <p>Te deben</p>
                <h1>{totalToReturnFrom}€</h1>
            </div>
            <div className="circleBottom">
                <h1>{totalToReturnTo}€</h1>
                <p>Debes</p>
            </div>
        </div>
    )
}