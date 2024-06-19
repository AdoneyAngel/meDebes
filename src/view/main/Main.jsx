import MainHeader from "../../components/MainHeader";
import PaymentCircle from "./PaymentsCircle";
import "../../styles/main.css"
import ReturnsList from "../../components/ReturnsList";
import { useEffect, useState } from "react";
import User from "../../model/User";
import LocalData from "../../model/localData";
import notificationIcon from "../../icons/notification.png"
import NotificationPanel from "../../components/popups/NotificationPanel";

export default function Main () {

    const [haveNotifications, setHaveNotifications] = new useState(false)
    const [notificationPanel, setNotificationPanel] = new useState(false)
    const [reloadReturnsList, setReloadReturnsList] = new useState(false)

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

    const updateReturnsList = () => {

    }

    useEffect(() => {

        //Set padding
        const paymentCircle = document.getElementById("paymentCircle")
        const body = document.querySelector(".body")

        body.style.paddingTop = paymentCircle.clientHeight+70 + "px"

        //Check notifications
        checkNotifications()
    }, [])

    return (
        <div id="main">
            <MainHeader />
            {
                notificationPanel ? <NotificationPanel close={hideNotifications} /> : null
            }
            <div className="paymentCircleContainer">
                <PaymentCircle />

                {
                    haveNotifications ? (
                        <div className="alertContainer" onClick={showNotifications}>
                            <img src={notificationIcon} />
                        </div>                        
                    ) : null
                }


            </div>
            {
                !reloadReturnsList ? (
                    <div className="body">
                        <ReturnsList of="to"/>
                        <ReturnsList of="from"/>
                    </div>                    
                ) : null
            }

        </div>
    )
}