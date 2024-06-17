import { useEffect, useState } from "react"
import "../styles/notify.css"

export default function NotifyErr ({text, onClick}) {
    const [notifyText, setNotifyText] = new useState("")

    useEffect(() => {
        setNotifyText(text)
    }, [])

    return (
        <div id="notify" onClick={onClick}>
            <p>{notifyText}</p>
        </div>
    )
}