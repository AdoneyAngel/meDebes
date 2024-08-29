import PopUp from "./PopUp";
import "../../styles/notificationPanel.css"
import { useEffect, useState } from "react";
import LocalData from "../../model/localData";
import Return from "../../model/Return";
import NotificationItem from "./NotificationItem";
import Contact from "../../model/Contact";

export default function NotificationPanel ({close}) {

    const [creationRequests, setCreationRequests] = new useState([])
    const [historyRequests, setHistoryRequests] = new useState([])
    const [finishRequests, setFinishRequests] = new useState([])
    const [contactRequests, setContactRequests] = new useState([])
    const [nicknameInput, setNicknameInput] = new useState(false)
    const [nicknameToAdd, setNicknameToAdd] = new useState("")

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

    const loadContactRequests = async () => {
        const userId = LocalData.getData("id")

        Contact.getWaitingRequests_to(userId)
        .then (res => {
            setContactRequests(res)
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

    const showNicknamePage = (id_request) => {
        openPage(() => setNicknameInput(id_request), "Nombre")
    }

    const hideNicknamePage = () => {
        closePage(() => {
            setNicknameInput(false)
        })
    }

    const rejectContactRequest = async id => {
        Contact.rejectRequest(id)
        .then (res => {
            console.log(res)
            close()
        })
    }

    const acceptContactRequest = async id => {
        Contact.acceptRequest(id, nicknameToAdd)
        .then(res => {
            console.log(res)
            close()
        })
    }

    const openPage = (pageState, pageTitle) => {
        const notificationList = document.getElementById("notificationList")
        const nextPage = document.getElementById("notificationNextPage")
        const panelTitle = document.getElementById("notificationPanelTitle")

        notificationList.style.opacity = 0
        notificationList.style.transform = "translateX(-10px)"

        setTimeout(() => {
            notificationList.style.display = "none"

            panelTitle.innerText = pageTitle

            pageState()

            nextPage.style.opacity = 1
            nextPage.style.transform = "translateX(0px)"

        }, 400);
        
    }

    const closePage = (pageState) => {
        const notificationList = document.getElementById("notificationList")
        const nextPage = document.getElementById("notificationNextPage")
        const panelTitle = document.getElementById("notificationPanelTitle")

        nextPage.style.opacity = 0
        nextPage.style.transform = "translateX(10px)"


        setTimeout(() => {
            notificationList.style.display = "block"

            pageState()

            setTimeout(() => {
                panelTitle.innerText = "Notificaciones"

                notificationList.style.opacity = 1
                notificationList.style.transform = "translateX(0px)"
            }, 100);

        }, 400);
    }

    useEffect(() => {
        loadCreationRequests()
        loadHistoryRequests()
        loadFinishRequests()
        loadContactRequests()

    }, [])

    return (
        <PopUp onClick={close}>
            <div id="notificationPanel">
                <h1 id="notificationPanelTitle">Notificaciones</h1>
                <div className="notificationList" id="notificationList">
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

                    {contactRequests.length ? <div className="notificationSeparator"><p>Peticiones de amistad</p></div> : null}  

                    {
                        contactRequests.map(request => {
                            return (<NotificationItem accept={showNicknamePage} reject={rejectContactRequest} type="contact" key={request.id} info={request}/>)
                        })
                    } 
                </div>

                <div className="nextPage" id="notificationNextPage">
                    {nicknameInput ? (
                        <div className="addContact">
                            <input className="addContactInput" type="text" onChange={(e) => setNicknameToAdd(e.target.value)} placeholder="Nombre de contacto"/>
                            <div className="buttonSection">
                                <button className="cancel" onClick={hideNicknamePage}>Cancelar</button>
                                <button className="add" onClickCapture={() => acceptContactRequest(nicknameInput)}>Agregar</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>       


        </PopUp>
    )
}