import { useEffect, useState } from "react"
import "../../styles/contacts.css"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import AddContact from "../../components/popups/AddContact"
import ContactInfo from "../../components/popups/ContactInfo"
import ContactsList from "../../components/ContactsList"

export default function Contacts() {
    const routerNavigation = useNavigate()

    const [addContacts, setAddContacts] = new useState(false)
    const [contactInfo, setContactInfo] = new useState(false)
    const [contactId, setContactId] = new useState(-1)

    useEffect(() => {
    }, [])

    const goBack = () => {
        routerNavigation("/")
    }

    const showAddContact = () => {
        setAddContacts(true)
    }
    const hideAddContact = () => {
        setAddContacts(false)
    }

    const showContactInfo = (id) => {
        setContactId(id)
        setContactInfo(true)
    }
    const hideContactInfo = (id) => {
        setContactId(-1)
        setContactInfo(false)
    }

    return (
        <div id="contactsView">

            {
                addContacts ? <AddContact close={hideAddContact}/> : null
            }
            {
                contactInfo ? <ContactInfo close={hideContactInfo} id={contactId} /> : null
            }
            
            <PageHeader back={goBack}/>
            <h1>Contactos</h1>
            <section className="body">
                <button onClick={showAddContact}>Añadir</button>
                <ContactsList onClick={showContactInfo}/>
            </section>
        </div>
    )
}