import { useEffect, useState } from "react"
import "../../styles/contacts.css"
import Contact from "../../model/Contact"
import LocalData from "../../model/localData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import AddContact from "../../components/popups/AddContact"
import ContactInfo from "../../components/popups/ContactInfo"

export default function Contacts() {
    const routerNavigation = useNavigate()

    const [contacts, setContacts] = new useState([])

    const [addContacts, setAddContacts] = new useState(false)
    const [contactInfo, setContactInfo] = new useState(false)
    const [contactId, setContactId] = new useState(-1)

    useEffect(() => {
        loadContacts()
    }, [])

    const goBack = () => {
        routerNavigation("/")
    }

    const showAddContact = () => {
        setAddContacts(true)
    }
    const hideAddContact = () => {
        setAddContacts(false)
        loadContacts()
    }

    const showContactInfo = (id) => {
        setContactId(id)
        setContactInfo(true)
    }
    const hideContactInfo = (id) => {
        setContactId(-1)
        setContactInfo(false)
        loadContacts()
    }

    const loadContacts = async () => {
        const userId = LocalData.getData("id")
        
        Contact.getContacsProfiles(userId)
        .then (res => {
            setContacts(res)
        })
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

                <div className="contactList">
                    {
                        contacts.map(contactItem => {
                            return (
                                <div onClick={() => showContactInfo(contactItem.id)} className="contactItem" key={contactItem.id}>
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