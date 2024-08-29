import { useState } from "react"
import "../../styles/addContact.css"
import PopUp from "./PopUp"
import User from "../../model/User"
import NotifyErr from "../Notify"
import FullScreenloading from "../FullScreenLoading"
import Contact from "../../model/Contact"
import LocalData from "../../model/localData"

export default function AddContact ({close}) {
    const [userInfo, setUserInfo] = new useState("")
    const [validInfo, setValidInfo] = new useState(false)
    const [nickname, setNickname] = new useState("")
    const [contactId, setContactId] = new useState(-1)

    const [notify, setNotify] = new useState(false)
    const [notifyText, setNotifyText] = new useState("")

    const [loading, setLoading] = new useState(false)

    const showLoading = () => {
        setLoading(true)
    }
    const hideLoading = () => {
        setLoading(false)
    }

    const showNotify = (txt) => {
        setNotify(false)
        setNotify("")

        setTimeout(() => {
            setNotifyText(txt)
            setNotify(true)            
        }, 100);
        
    }
    const hideNotify = () => {
        setNotify(false)
    }

    const validateInfo = async (e) => {
        e.preventDefault()

        if (userInfo.length > 0) {
            showLoading()

            User.getUserProfileByInfo(userInfo).then(contactProfile => {
                hideLoading()

                if (contactProfile) {

                    const userId = LocalData.getData("id")

                    if (contactProfile.id != userId) {
                        setContactId(contactProfile.id)
                        setValidInfo(true)
                        
                    } else {
                        showNotify("No puedes agregarte a ti mismo")
                    }

                } else {
                    showNotify("No se ha podido encontrar al usuario")
                }
            })
        }

    }

    // const addContact = async (e) => {
    //     e.preventDefault()

    //     const userId = LocalData.getData("id")

    //     if (userId) {
    //         showLoading()

    //         Contact.addContact(userId, contactId, nickname)
    //         .then(res => {
    //             hideLoading()

    //             close()
    //         })
    //     }
        
    // }

    const createRequest = async (e) => {
        e.preventDefault()

        const user_from = LocalData.getData("id")

        if (user_from) {
            showLoading()

            Contact.createRequest(user_from, contactId, nickname)
            .then(res => {
                hideLoading()

                close()
            })
        }
    }

    return (
        <PopUp onClick={close}>
            {notify ? <NotifyErr onClick={hideNotify} type="err" text={notifyText}/> : null}
            {loading ? <FullScreenloading /> : null}
            {
                !validInfo ? (
                    <form onSubmit={e => validateInfo(e)} className="addContactForm infoForm">
                        <label>Nombre o correo electrónico</label>
                        <input onChange={e => setUserInfo(e.target.value)} placeholder="correo@gmail.com" type="text"/>
                        <button>Buscar</button>
                    </form>
                ) : null
            }
            {
                validInfo ? (
                    <form onSubmit={e => createRequest(e)} className="addContactForm nicknameForm">
                        <label>Nombre</label>
                        <input onChange={e => setNickname(e.target.value)} placeholder="Isi" type="text"/>
                        <button>Añadir</button>
                    </form>
                ) : null
            }           
        </PopUp>

    )
}