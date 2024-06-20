import PopUp from "./PopUp";
import "../../styles/notificationPanel.css"
import { useEffect, useState } from "react";
import LocalData from "../../model/localData";
import Return from "../../model/Return";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel ({close}) {

    const [creationRequests, setCreationRequests] = new useState([])
    const [historyRequests, setHistoryRequests] = new useState([])
    const [finishRequests, setFinishRequests] = new useState([])

    const loadCreationRequests = async () => {
        const userId = LocalData.getData("id")

        Return.getCreationRequests_to(userId)
        .then(res => {
            setCreationRequests(res)
        })
    }

    const loadHistoryRequests = async () => {
        const userId = LocalData.getData("id")

        Return.getHistoryRequests_to(userId)
        .then(res => {
            setHistoryRequests(res)
        })
    }

    const loadFinishRequests = async () => {
        const userId = LocalData.getData("id")

        Return.getFinishRequests_to(userId)
        .then(res => {
            setFinishRequests(res)
        })
    }

    const acceptCreation = async (id) => {
        Return.acceptCreation(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error accepting creation request")
            }
        })
    }

    const rejectCreation = async (id) => {
        Return.rejectCreation(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error rejecting creation request")
            }
        })
    } 

    const acceptHistory = async (id) => {
        Return.acceptHistory(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error accepting payment request")
            }
        })
    }


    const rejectHistory = async (id) => {
        Return.rejectHistory(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error rejecting payment request")
            }
        })
    }

    const acceptFinish = async (id) => {
        Return.acceptFinish(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error accepting finish request")
            }
        })
    }

    const rejectFinish = async (id) => {
        Return.rejectFinish(id)
        .then(res => {
            console.log(res)
            if (res) {
                close()

            } else {
                console.log("Error rejecting finish request")
            }
        })
    }

    useEffect(() => {
        loadCreationRequests()
        loadHistoryRequests()
        loadFinishRequests()

    }, [])

    return (
        <PopUp onClick={close}>
            <div id="notificationPanel">
                <h1>Notificaciones</h1>
                <div className="notificationList">
                    {creationRequests.length ? <div className="notificationSeparator"><p>Nuevas devoluciones</p></div> : null}
                    {
                        creationRequests.map(request => {
                            return (<NotificationItem accept={acceptCreation} reject={rejectCreation} type="creation" key={request.id} info={request}/>)
                        })
                    }
                    
                    {historyRequests.length ? <div className="notificationSeparator"><p>Movimientos</p></div> : null}

                    {
                        historyRequests.map(request => {
                            return (<NotificationItem accept={acceptHistory} reject={rejectHistory} type="history" key={request.id} info={request}/>)
                        })
                    }

                    {finishRequests.length ? <div className="notificationSeparator"><p>Finalizaciones</p></div> : null}

                    {
                        finishRequests.map(request => {
                            return (<NotificationItem accept={acceptFinish} reject={rejectFinish} type="finish" key={request.id} info={request}/>)
                        })
                    }
                </div>
            </div>            
        </PopUp>
    )
}