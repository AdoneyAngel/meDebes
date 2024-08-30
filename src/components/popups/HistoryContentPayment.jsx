import { useEffect, useState } from "react"
import DateTime from "../../model/DateTime"

import moneyIcon from "../../icons/money.png"
import moneyLessIcon from "../../icons/moneyLess.png"
import moneyMoreIcon from "../../icons/moneyMore.png"

export default function HistoryContentPayment ({item, user_id}) {

    const [itemClass, setItemClass] = new useState("historyItem historyItemType_"+item.type)

    useEffect(() => {
        if (item.accepted === 1) {
            setItemClass("historyItem historyItemType_"+item.type + " green")

        } else if (item.accepted === -1) {
            setItemClass("historyItem historyItemType_"+item.type + " red")

        }else {
            setItemClass("historyItem historyItemType_"+item.type + " grey")
        }
    })

    return (
        <div className={itemClass} >

            <section className="itemContent">
                <p>
                    Modificacion de <span className="boldname">{item.concept} <span className="underline">({item.name})</span> </span>
                    {
                        item.accepted === 0 && item.user_from == user_id ? " solicitada " : null
                    }
                    {
                        item.accepted === 0 && item.user_to == user_id ? " recibida " : null
                    }
                    {
                        item.accepted === 1 && item.user_to == user_id ? " procesada " : null
                    }
                    {
                        item.accepted === -1 && item.user_to == user_id ? " rechazada " : null
                    }
                </p>

            </section>

            <section className="itemDate">
                <img src={item.amount < 0 ? moneyLessIcon : moneyMoreIcon} />
                <p>
                    {DateTime.mysqlToApp(item.date)}
                </p>
            </section>

        </div>
    )
}