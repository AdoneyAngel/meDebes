import { useEffect, useState } from "react"
import DateTime from "../../model/DateTime"

import clockIcon from "../../icons/clock.png"
import moneyIcon from "../../icons/money.png"

export default function HistoryContentReturn ({item, user_id}) {

    const [itemClass, setItemClass] = new useState("historyItem historyItemType_"+item.type + " green")

    useEffect(() => {
        // if (item.accepted === 1) {
        //     setItemClass("historyItem historyItemType_"+item.type + " green")

        // } else if (item.accepted === -1) {
        //     setItemClass("historyItem historyItemType_"+item.type + " red")

        // }else {
        //     setItemClass("historyItem historyItemType_"+item.type + " grey")
        // }
    })

    return (
        <div className={itemClass} >

            <section className="itemContent">
                <p>
                    Devolución <span className="boldname">{item.concept} <span className="underline">({item.name})</span></span> [{item.money}€] creada
                </p>

            </section>

            <section className="itemDate">
                <div className="icons">
                    <img src={moneyIcon} />
                    {
                        item.accepted === 0 ? <img className="clockIcon" src={clockIcon}/> : null
                    }                    
                </div>

                <p>
                    {DateTime.mysqlToApp(item.date)}
                </p>
            </section>

        </div>
    )
}