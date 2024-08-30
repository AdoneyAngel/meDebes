import plusIcon from "../icons/plus.png"
import notificationIcon from "../icons/email.png"
import historyIcon from "../icons/history.png"
import {Link} from "react-router-dom"
import "../styles/mainHeader.css"

export default function MainHeader ({haveNotification, showNotifications, showHistory}) {

    return (
        <div id="mainHeader">
            <Link to="/create" className="headerButton" id="addReturnButton"><img src={plusIcon} /></Link>
            <div onClick={showHistory} className="historyContainer right container">
                <img src={historyIcon} />
            </div>
            <div className={haveNotification?"alertContainer haveNotifications container" : "alertContainer container"} onClick={showNotifications}>
                <img src={notificationIcon} />
            </div> 
            <Link className="headerButton" id="contactsButton" to="/contacts">Contactos</Link>
        </div>
    )
}