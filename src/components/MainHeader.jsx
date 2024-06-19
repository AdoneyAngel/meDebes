import plusIcon from "../icons/plus.png"
import {Link} from "react-router-dom"
import "../styles/mainHeader.css"
import notificationIcon from "../icons/email.png"

export default function MainHeader ({haveNotification, showNotifications}) {

    return (
        <div id="mainHeader">
            <Link to="/create" className="headerButton" id="addReturnButton"><img src={plusIcon} /></Link>
            <div className={haveNotification?"alertContainer haveNotifications" : "alertContainer"} onClick={showNotifications}>
                <img src={notificationIcon} />
            </div> 
            <Link className="headerButton" id="contactsButton" to="/contacts">Contactos</Link>
        </div>
    )
}