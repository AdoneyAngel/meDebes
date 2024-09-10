import ContactsList from "../../components/ContactsList"
import "../../styles/createView.css"
import PageHeader from "../../components/PageHeader"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import Return from "../../model/Return"
import LocalData from "../../model/localData"
import LoadingIcon from "../../components/LoadingIcon"

export default function CreateView () {

    const routerNavigation = useNavigate()
    
    const [currentStep, setCurrentStep] = new useState(0)

    const [selectedUser, setSelectedUser] = new useState(0)
    const [selectedMoney, setSelectedMoney] = new useState(0)
    const [selectedConcept, setSelectedConcept] = new useState("")
    const [selectedMethod, setSelectedMethod] = new useState(0) /*[-1= I owe] [1= he owe]*/

    const [loading, setLoading] = new useState(false)

    const selectMethod = (method) => {
        setSelectedMethod(method)
        setCurrentStep(1)
    }

    const selectUser = (id) => { //steps: 0(select user) 1(set money) 2(concept)
        setSelectedUser(id)
        setCurrentStep(2)
    }

    const selectMoney = (e) => {
        setSelectedMoney(e.target.value)
    }

    const selectConcept = (e) => {
        setSelectedConcept(e.target.value)
    }

    const endMoneyStep = () => {
        if (selectedMoney > 0) {
            setCurrentStep(3)
        }
    }

    const endCreation = () => {
        if (selectedUser) {
            if (selectedMoney > 0) {
                if (selectConcept.length > 0) {
                    const userId = LocalData.getData("id")

                    //Check the selected method

                    if (selectedMethod === 1) {
                        Return.createReturnRequest(userId, selectedUser, selectedMoney, selectedConcept)
                        .then(res => {
                            if (res) {
                                routerNavigation("/")
    
                            } else {
                                console.log("Error creating return request")
                            }
                        }) 

                    } else if (selectedMethod === -1) {
                        Return.createReturnRequest(selectedUser, userId, selectedMoney, selectedConcept)
                        .then(res => {
                            if (res) {
                                routerNavigation("/")
    
                            } else {
                                console.log("Error creating return request")
                            }
                        }) 

                    } else {
                        setCurrentStep(0)
                    }

                }

            } else {
                setCurrentStep(2)
            }
        } else {
            setCurrentStep(1)
        }
    }

    const prevStep = () => {
        setCurrentStep(currentStep-1)
    }

    useEffect(() => {
        if (currentStep <= -1) {
            routerNavigation("/")
        }

    }, [currentStep])

    return (
        <div id="createView">
                
            <PageHeader back={prevStep} />

            {/* Select method */}

            <div className={currentStep == 0 ? "selectMethod page" : "createHiddenPage"}>
                <h1>Seleccionar método</h1>
                <div className="createViewBody">
                    <div className="methodList">

                        <button className="green" onClick={() => selectMethod(1)}><span className="bold">Me</span> debe</button>
                        <button className="red" onClick={() => selectMethod(-1)}><span className="bold">Yo</span> debo</button>                        

                    </div>
                </div>                
            </div>

            {/* Select user */}

            <div className={currentStep == 1 ? "selectUser page" : "createHiddenPage"}>
                <h1>Seleccionar contacto</h1>
                <div className="createViewBody">
                    <ContactsList onClick={selectUser} />
                </div>                
            </div>

            {/* Money */}

            <div className={currentStep == 2 ? "selectMoney page" : "createHiddenPage"}>
                <h1>Cantidad a devolver</h1>
                <div className="createViewBody">
                    <div className="moneyContent">
                        <input onChange={(e) => selectMoney(e)} className="moneyInput" type="number" placeholder="€"/>
                        <button onClick={endMoneyStep} className="nextPageButton">Continuar</button>                        
                    </div>
                </div>                
            </div>

            {/* Concept */}

            <div className={currentStep == 3 ? "selectConcept page" : "createHiddenPage"}>
                <h1>Concepto de devolución</h1>
                <div className="createViewBody">
                    <textarea onChange={e => selectConcept(e)} className="conceptArea" type="number" placeholder="Motivo"></textarea>
                    {
                        !loading ? <button onClick={endCreation} className="nextPageButton">Finalizar</button> : <p className="nextPageButton"><LoadingIcon /></p>
                    }
                    
                </div>                
            </div>
        </div>
    )
}