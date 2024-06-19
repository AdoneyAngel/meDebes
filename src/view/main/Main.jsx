import MainHeader from "../../components/MainHeader";
import PaymentCircle from "./PaymentsCircle";
import "../../styles/main.css"
import ReturnsList from "../../components/ReturnsList";
import { useEffect, useState } from "react";
import User from "../../model/User";
import LocalData from "../../model/localData";
import NotificationPanel from "../../components/popups/NotificationPanel";

export default function Main () {

    const [haveNotifications, setHaveNotifications] = new useState(false)
    const [notificationPanel, setNotificationPanel] = new useState(false)

    const showNotifications = () => {
        setNotificationPanel(true)
    }
    const hideNotifications = () => {
        setNotificationPanel(false)
        checkNotifications()
    }

    const checkNotifications = async () => {
        const userId = LocalData.getData("id")

        User.userHaveNotifications(userId)
        .then(haveNotification => {
            setHaveNotifications(haveNotification)
        })
    }

    useEffect(() => {
        //Check notifications
        checkNotifications()
    }, [])

    return (
        <>
        {
            notificationPanel ? <NotificationPanel close={hideNotifications} /> : null
        }
        <div id="main">
            <MainHeader showNotifications={showNotifications} haveNotification={haveNotifications}/>
            <div className="paymentCircleContainer">
                <PaymentCircle />
            </div>
            <div className="body">
                <ReturnsList of="to"/>
                <ReturnsList of="from"/>
            </div>   

        </div>
        </>
    )
}