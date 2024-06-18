import PopUp from "./PopUp";
import "../../styles/notificationPanel.css"
import { useEffect, useState } from "react";
import LocalData from "../../model/localData";
import Return from "../../model/Return";
import moneyIcon from "../../icons/money.png"

export default function NotificationPanel ({close}) {

    const [creationRequests, setCreationRequests] = new useState([])
    const [historyRequests, setHistoryRequests] = new useState([])
    const [finishRequests, setFinishRequests] = new useState([])

    const loadCreationRequests = async () => {
        const userId = LocalData.getData("id")

        Return.getCreationRequests(userId)
        .then(res => {
            setCreationRequests(res)
        })
    }

    useEffect(() => {
        loadCreationRequests()

    }, [])

    return (
        <PopUp onClick={close}>
            <div id="notificationPanel">
                <h1>Notificaciones</h1>
                <div className="notificationList">
                    <div className="notificationSeparator"><p>Nuevas devoluciones</p></div>
                    {
                        creationRequests.map(request => {
                            return (
                             <div key={request.id} className="notificationItem">
                                <img src={moneyIcon}/>
                                <p className="notificationContent">Debes {request.money}€ a <span className="boldName">{request.nickname}</span></p>
                                <p className="notificationDate">
                                    {
                                        request.date
                                    }
                                </p>
                            </div>   
                            )
                        })
                    }
                </div>
            </div>            
        </PopUp>
    )
}