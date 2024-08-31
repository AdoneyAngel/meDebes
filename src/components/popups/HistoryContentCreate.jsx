import { useEffect, useState } from "react"
import DateTime from "../../model/DateTime"

import clockIcon from "../../icons/clock.png"
import notificationIcon from "../../icons/notification.png"

export default function HistoryContentCreate ({item, user_id}) {

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
                    {
                        item.user_from == user_id && item.accepted == 0 ? "Solicitó devolución " : null
                    }
                    {
                        item.user_to == user_id && item.accepted == 0 ? "Recibió devolución " : null
                    }
                    {
                        item.accepted != 0 ? "Solicitud devolución " : null
                    }
                    
                    <span className="boldname">{item.concept} <span className="underline">({item.name})</span></span>

                    {
                        item.accepted == -1 ? " rechazada" : null
                    }
                    {
                        item.accepted == 1 ? " aceptada" : null
                    }
                </p>

            </section>

            <section className="itemDate">
                <div className="icons">
                    <img src={notificationIcon} />
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