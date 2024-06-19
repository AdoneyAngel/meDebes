import { useEffect, useState } from "react"
import moneyIcon from "../../icons/money.png"
import moneyMore from "../../icons/moneyMore.png"
import moneyLess from "../../icons/moneyLess.png"
import "../../styles/notificationItem.css"

export default function NotificationItem ({info: notificationData, type, accept, reject}) {

    const [opened, setOpened] = new useState(false)

    const switchButtons = () => {
        setOpened(!opened)
    }

    useEffect(() => {

    })
    
    return (
        <>
        {
            type === "creation" ? (
                <div key={notificationData.id} id="notificationItem" className={opened ? "notificationOpened red" : "red"}>
                    <img src={moneyIcon}/>
                    <p className="notificationContent" onClick={switchButtons}>
                        Debes {notificationData.money}€ a <span className="boldName">{notificationData.nickname}</span> por <span className="boldConcept">{notificationData.concept}</span>
                    </p>
                    <p className="notificationDate">
                        {
                            notificationData.date
                        }
                    </p>
                    {
                        opened ? (
                            <div className="notificationButtons">
                                <button className="cancelButton" onClick={() => reject(notificationData.id)}>Rechazar</button>
                                <button className="acceptButton" onClick={() => accept(notificationData.id)}>Aceptar</button>
                            </div>                                
                        ) : null
                    }
                </div>                  
            ) : null  
        }
        {
            type === "history" ? (
                <div key={notificationData.id} id="notificationItem" className={opened ? "notificationOpened "+(notificationData.amount<0?"green":"red") : (notificationData.amount<0?"green":"red")}>
                    <img src={notificationData.amount > 0 ? moneyMore : moneyLess}/>
                    <p onClick={switchButtons} className="notificationContent">
                        {
                            notificationData.amount > 0 ? "Aumento " : "Disminución "
                        }
                        de {Math.abs(notificationData.amount)}€ devolución <span className="boldConcept">{notificationData.concept}</span> de <span className="boldName">{notificationData.nickname}</span>
                    </p>
                    <p className="notificationDate">
                        {
                            notificationData.date
                        }
                    </p>
                    {
                        opened ? (
                            <div className="notificationButtons">
                                <button className="cancelButton" onClick={() => reject(notificationData.id)}>Rechazar</button>
                                <button className="acceptButton" onClick={() => accept(notificationData.id)}>Aceptar</button>
                            </div>                                
                        ) : null
                    }
                </div>                  
            ) : null  
        }
        {
            type === "finish" ? (
                <div key={notificationData.id} id="notificationItem" className={opened ? "notificationOpened "+(notificationData.amount<0?"green":"red") : (notificationData.amount<0?"green":"red")}>
                    <img src={notificationData.amount > 0 ? moneyMore : moneyLess}/>
                    <p onClick={switchButtons} className="notificationContent">
                        ¿Finalizar <span className="boldConcept">{notificationData.concept}</span> de <span className="boldName">{notificationData.nickname}</span>?
                    </p>
                    <p className="notificationDate">
                        {
                            notificationData.date
                        }
                    </p>
                    {
                        opened ? (
                            <div className="notificationButtons">
                                <button className="cancelButton" onClick={() => reject(notificationData.id)}>Rechazar</button>
                                <button className="acceptButton" onClick={() => accept(notificationData.id)}>Aceptar</button>
                            </div>                                
                        ) : null
                    }
                </div>                  
            ) : null  
        }
        </>
       )
}