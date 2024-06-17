import { useEffect, useState } from "react"
import "../styles/notify.css"

export default function NotifyErr ({text, onClick, type}) {
    const [notifyText, setNotifyText] = new useState("")
    const [className, setClassName] = new useState("notify")

    useEffect(() => {
        setNotifyText(text)

        if (type === "err") {
            setClassName("notifyErr")

        } else {
            setClassName("notify")
        }

    }, [])

    return (
        <div id="notify" className={className} onClick={onClick}>
            <p>{notifyText}</p>
        </div>
    )
}