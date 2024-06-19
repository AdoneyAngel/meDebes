import { useEffect, useState } from "react"
import Contact from "../model/Contact"
import LocalData from "../model/localData"
import LoadingIcon from "./LoadingIcon"

export default function ContactsList ({onClick}){

    const [contacts, setContacts] = new useState([])
    const [loadingContacts, setLoadingContacts] = new useState(false)

    const loadContacts = async () => {
        const userId = LocalData.getData("id")

        setLoadingContacts(true)
        
        Contact.getContacsProfiles(userId)
        .then (res => {
            setLoadingContacts(false)
            setContacts(res)
        })
    }

    useEffect(() => {
        loadContacts()
    }, [])

    return (
        <div className="contactList">
            {loadingContacts ? <LoadingIcon /> : null}
            {
                contacts.map(contactItem => {
                    return (
                        <div onClick={() => onClick(contactItem.id)} className="contactItem" key={contactItem.id}>
                            <p className="contactNickname">{contactItem.nickname}</p>
                            <p className="contactMail">{contactItem.mail}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}