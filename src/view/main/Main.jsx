import MainHeader from "../../components/MainHeader";
import PaymentCircle from "./PaymentsCircle";
import "../../styles/main.css"
import ReturnsList from "../../components/ReturnsList";
import { useEffect, useState } from "react";
import User from "../../model/User";
import LocalData from "../../model/localData";
import NotificationPanel from "../../components/popups/NotificationPanel";
import ReturnInfo from "../../components/popups/ReturnInfo";
import History from "../../components/popups/History";

export default function Main () {

    const [haveNotifications, setHaveNotifications] = new useState(false)
    const [notificationPanel, setNotificationPanel] = new useState(false)
    const [history, setHistory] = new useState(false)
    const [historyId, setHistoryId] = new useState(false)

    const [selectedReturn, setSelectedReturn] = new useState(0)
    const [returnInfo, setReturnInfo] = new useState(false)

    const showHistory = () => {
        const userId = LocalData.getData("id")

        setHistoryId(userId)
        setHistory(true)
    }

    const hideHistory = () => {
        setHistory(false)
    }

    const showReturnInfo = (id) => {
        setSelectedReturn(id)
        setReturnInfo(true)
    }

    const hideReturnInfo = () => {
        setSelectedReturn(0)
        setReturnInfo(false)
    }

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
        {
            returnInfo ? <ReturnInfo id={selectedReturn} close={hideReturnInfo}/> : null
        }
        {
            history ? <History close={hideHistory} id={historyId}/> : null
        }
        <div id="main">
            <MainHeader showNotifications={showNotifications} haveNotification={haveNotifications} showHistory={showHistory}/>
            <div className="paymentCircleContainer">
                <PaymentCircle />
            </div>
            <div className="body">
                <ReturnsList onClick={showReturnInfo} of="to"/>
                <ReturnsList onClick={showReturnInfo} of="from"/>
            </div>   

        </div>
        </>
    )
}