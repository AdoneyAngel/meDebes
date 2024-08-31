import { useEffect, useState } from "react"
import DateTime from "../../model/DateTime"

import dealIcon from "../../icons/deal.png"
import clockIcon from "../../icons/clock.png"

export default function HistoryContentFinish ({item, user_id}) {

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
                    Finalización de <span className="boldname">{item.concept} <span className="underline">({item.name})</span></span>
                    {
                        item.accepted === 0 && item.user_from == user_id ? " solicitada " : null
                    }
                    {
                        item.accepted === 0 && item.user_to == user_id ? " recibida " : null
                    }
                    {
                        item.accepted === 1 ? " procesada " : null
                    }
                    {
                        item.accepted === -1 ? " rechazada " : null
                    }
                </p>

            </section>

            <section className="itemDate">
                <div className="icons">
                    <img src={dealIcon} />
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