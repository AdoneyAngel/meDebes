import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import Contact from "../../model/Contact";
import LocalData from "../../model/localData";
import "../../styles/contactInfo.css"

export default function ContactInfo({close, id: contactId}) {
    const [contactInfo, setContactInfo] = new useState({})
    const [showDeleteContact, setShowDeleteContact] = new useState(false)
    const [showModifyName, setShowModifyName] = new useState(false)

    const [modifiedContactName, setModifiedContactName] = new useState("")

    const getContactInfo = async () => {
        const userId = LocalData.getData("id")

        Contact.getContactProfile(userId, contactId)
        .then(res => {
            if (res) {
                setContactInfo(res)

            } else {
                console.log("Error getting contact info")
            }
        }) 
    }

    const deleteContact = async () => {
        const userId = LocalData.getData("id")

        if (userId) {
            Contact.deleteContact(userId, contactId)
            .then (contactDeleted => {
                if (contactDeleted) {
                    close()

                } else {
                    console.log("Error deleting contact")
                }
            })
        }
    }

    const modifyContactName = async (e) => {
        e.preventDefault()

        if (modifiedContactName.length > 0) {
            const userId = LocalData.getData("id")

            Contact.renameContact(userId, contactInfo.id, modifiedContactName)
            .then (nameModified => {
                if (nameModified) {
                    close()

                } else {
                    console.log("Error renaming contact")
                }
            })
        }
    }

    useEffect(() => {
        getContactInfo()
        setModifiedContactName("")
    }, [])

    return (
        <PopUp onClick={close}>
            {
                contactInfo && !showDeleteContact && !showModifyName ? (
                    <div id="contactInfo">
                        <h1 onClick={() => setShowModifyName(true)}>{contactInfo.nickname}</h1>
                        <p className="contactInfoName">{contactInfo.name}</p>
                        <p className="contactInfoMail">{contactInfo.mail}</p>
                        <button onClick={() => setShowDeleteContact(true)} className="deleteContactButton">Eliminar</button>
                    </div>
                ) : null
            }
            {
                showDeleteContact ? (
                    <div id="deleteContact">
                        <h1>¿Seguro desea eliminarlo?</h1>

                        <div className="options">
                            <button className="deleteContactButton" onClick={deleteContact}>Eliminar</button>   
                            <button className="cancelDeleteButton" onClick={() => setShowDeleteContact(false)}>Cancelar</button>                         
                        </div>

                    </div>
                ) : null
            }
            {
                showModifyName ? (
                    <form onSubmit={e => modifyContactName(e)} id="modifyContactName">
                        <h1>{contactInfo.nickname}</h1>
                        <input onChange={(e) => setModifiedContactName(e.target.value)} type="text" placeholder="Nuevo nombre"/>
                        <div className="options">
                            <button type="button" onClick={() => setShowModifyName(false)}>Cancelar</button>
                            <button type="submit" className="modifyNameButton">Cambiar</button>
                        </div>
                    </form>
                ) : null
            }
        </PopUp>
    )
}