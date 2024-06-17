import { useEffect, useState } from "react"
import "../../styles/contacts.css"
import Contact from "../../model/Contact"
import LocalData from "../../model/localData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

export default function Contacts() {
    const routerNavigation = useNavigate()

    const [contacts, setContacts] = new useState([])

    useEffect(() => {
        const userId = LocalData.getData("id")
        
        Contact.getContacsProfiles(userId)
        .then (res => {
            setContacts(res)
        })

    }, [])

    const goBack = () => {
        routerNavigation("/")
    }

    return (
        <div id="contactsView">
            <PageHeader back={goBack}/>
            <h1>Contactos</h1>
            <section className="body">
                <button>Añadir</button>
                <div className="contactList">
                    {
                        contacts.map(contactItem => {
                            return (
                                <div className="contactItem" key={contactItem.id}>
                                    <p className="contactNickname">{contactItem.nickname}</p>
                                    <p className="contactMail">{contactItem.mail}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}