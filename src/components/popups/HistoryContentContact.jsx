import { useEffect, useState } from "react"
import DateTime from "../../model/DateTime"

import coolhand from "../../icons/coolhand.png"

export default function HistoryContentContact ({item, user_id}) {

    const [itemClass, setItemClass] = new useState("historyItem historyItemType_"+item.type)

    useEffect(() => {
        if (item.accepted === 1) {
            setItemClass("historyItem historyItemType_"+item.type + " yellow")

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
                    Petición de amistad
                    {
                        item.accepted === 0 && item.user_from == user_id ? " enviada a " : null
                    }
                    {
                        item.accepted === 0 && item.user_to == user_id ? " recibida de " : null
                    }
                    {
                        item.accepted === 1 && item.user_to == user_id ? " aceptada con " : null
                    }
                    {
                        item.accepted === -1 && item.user_to == user_id ? " rechazada con " : null
                    }
                    <span className="boldname"><span className="underline">{item.name}</span></span>
                </p>

            </section>

            <section className="itemDate">
                <img src={coolhand} />
                <p>
                    {DateTime.mysqlToApp(item.date)}
                </p>
            </section>

        </div>
    )
}