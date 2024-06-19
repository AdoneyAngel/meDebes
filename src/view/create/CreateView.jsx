import ContactsList from "../../components/ContactsList"
import "../../styles/createView.css"
import PageHeader from "../../components/PageHeader"
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import Return from "../../model/Return"
import LocalData from "../../model/localData"

export default function CreateView () {

    const routerNavigation = useNavigate()
    
    const [currentStep, setCurrentStep] = new useState(0)

    const [selectedUser, setSelectedUser] = new useState(0)
    const [selectedMoney, setSelectedMoney] = new useState(0)
    const [selectedConcept, setSelectedConcept] = new useState("")
    
    const selectUser = (id) => { //steps: 0(select user) 1(set money) 2(concept)
        setSelectedUser(id)
        setCurrentStep(1)
    }

    const selectMoney = (e) => {
        setSelectedMoney(e.target.value)
    }

    const selectConcept = (e) => {
        setSelectedConcept(e.target.value)
    }

    const endMoneyStep = () => {
        if (selectedMoney > 0) {
            setCurrentStep(2)
        }
    }

    const endCreation = () => {
        if (selectedUser) {
            if (selectedMoney > 0) {
                if (selectConcept.length > 0) {
                    const userId = LocalData.getData("id")

                    Return.createReturnRequest(userId, selectedUser, selectedMoney, selectedConcept)
                    .then(res => {
                        if (res) {
                            routerNavigation("/")

                        } else {
                            console.log("Error creating return request")
                        }
                    }) 
                }

            } else {
                setCurrentStep(1)
            }
        } else {
            setCurrentStep(0)
        }
    }

    return (
        <div id="createView">
                
            <PageHeader back={() => routerNavigation("/")} />

            {/* Select user */}

            <div className={currentStep == 0 ? "selectUser page" : "createHiddenPage"}>
                <h1>Seleccionar contacto</h1>
                <div className="createViewBody">
                    <ContactsList onClick={selectUser} />
                </div>                
            </div>

            {/* Money */}

            <div className={currentStep == 1 ? "selectMoney page" : "createHiddenPage"}>
                <h1>Cantidad a devolver</h1>
                <div className="createViewBody">
                    <div className="moneyContent">
                        <input onChange={(e) => selectMoney(e)} className="moneyInput" type="number" placeholder="€"/>
                        <button onClick={endMoneyStep} className="nextPageButton">Continuar</button>                        
                    </div>
                </div>                
            </div>

            {/* Concept */}

            <div className={currentStep == 2 ? "selectConcept page" : "createHiddenPage"}>
                <h1>Concepto de devolución</h1>
                <div className="createViewBody">
                    <textarea onChange={e => selectConcept(e)} className="conceptArea" type="number" placeholder="Motivo"></textarea>
                    <button onClick={endCreation} className="nextPageButton">Continuar</button>  
                </div>                
            </div>
        </div>
    )
}