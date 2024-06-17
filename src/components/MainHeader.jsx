import plusIcon from "../icons/plus.png"
import {Link} from "react-router-dom"
import "../styles/mainHeader.css"

export default function MainHeader () {

    return (
        <div id="mainHeader">
            <button className="headerButton" id="addReturnButton"><img src={plusIcon} /></button>
            <Link className="headerButton" id="contactsButton" to="/contacts">Contactos</Link>
        </div>
    )
}