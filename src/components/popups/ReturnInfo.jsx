import { useEffect, useState } from "react"
import PopUp from "./PopUp"
import Return from "../../model/Return"
import "../../styles/returnInfo.css"
import LocalData from "../../model/localData"
import Contact from "../../model/Contact"
import moneyMoreIcon from "../../icons/moneyMore.png"
import moneyLessIcon from "../../icons/moneyLess.png"

export default function ReturnInfo ({id, close}) {

    const [data, setData] = new useState({})
    const [user_to_nickname, setUser_to_nickname] = new useState("")
    const [user_from_nickname, setUser_from_nickname] = new useState("")
    const [returnHistory, setReturnHistory] = new useState([])

    const [currentUserPosition, setCurrentUserPosition] = new useState("")
    const [anotherUserPosition, setAnotherUserPosition] = new useState("")

    const [moneyAction, setMoneyAction] = new useState(false)
    const [moneyActionType, setMoneyActionType] = new useState(0)
    const [selectedMoney, setSelectedMoney] = new useState(0)

    const showMoneyAction = (type) => {//+1 / -1
        setMoneyActionType(type)
        setMoneyAction(true)
    }

    const hideMoneyAction = () => {
        setMoneyActionType(0)
        setMoneyAction(false)
    }

    const createPayment = async () => {
        if (selectedMoney > 0 && moneyActionType) {
            const userId = LocalData.getData("id")

            const amount = selectedMoney*moneyActionType

            Return.createPaymentRequest(id, userId, amount)
            .then (res => {
                if (res) {
                    close()

                } else {
                    console.log("falied creating payment request")
                }
            })
        }
    }

    const createFinishRequest = async () => {
        const userId = LocalData.getData("id")

        if (userId) {
            Return.createFinishRequest(id, userId)
            .then (res => {
                if (res) {
                    close()

                } else {
                    console.log("failed creating finish request")
                }
            })
        }
    }

    const loadReturnData = async () => {
        if (id) {
            Return.getReturnData(id)
            .then (res => {
                const date = new Date(res.date)

                const dateData = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() +" "+ date.getHours()+":"+date.getMinutes()

                res.date = dateData

                setData(res)

                //Se nickname

                const userId = LocalData.getData("id")

                if (res.user_from == userId) {
                    setUser_from_nickname("Tu")

                    setCurrentUserPosition("right")
                    setAnotherUserPosition("left")

                    Contact.getContactProfile(userId, res.user_to)
                    .then(contactProfile => {
                        setUser_to_nickname(contactProfile.nickname)
                    })

                } else {
                    setUser_to_nickname("Tu")

                    setCurrentUserPosition("left")
                    setAnotherUserPosition("right")

                    Contact.getContactProfile(userId, res.user_from)
                    .then(contactProfile => {
                        setUser_from_nickname(contactProfile.nickname)
                    })
                }
            })

            //Get return history
            Return.getReturnHistory(id)
            .then (res => {

                res = res.map(currentHistory => {
                    const date = new Date(currentHistory.date)

                    const dateData = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() +" "+ date.getHours()+":"+date.getMinutes()
    
                    currentHistory.date = dateData

                    return currentHistory
                })

                setReturnHistory(res)
            })
        }
    }

    useEffect(() => {
        loadReturnData()
    }, [])

    return (
        <PopUp onClick={close}>
            {
                data && !moneyAction ? (

                <div id="returnInfo">
                    <h1>{data.concept}</h1> 

                    <section className="moneyContent">
                        <div className="money">
                            <p className="userHead">Faltan</p>
                            <p>{data.total}€</p>
                        </div>
                    </section>

                    <section className="usersContent">
                        <div className="user"><p className="userHead">Envía</p>{user_to_nickname}</div>
                        <div className="user"><p className="userHead">Recibe</p>{user_from_nickname}</div>
                    </section>            

                    <section className="historyContent">
                        <div id="right" className="historyItem creationDate grey">
                            <p className="historyItemContent">Creación</p>
                            <p className="historyItemData">{data.date}</p>
                        </div>
                        
                        {
                            returnHistory.map(currentHistory => {
                                const userId = LocalData.getData("id")
                                return (
                                    <div key={currentHistory.id} id={currentHistory.user_from == userId ? currentUserPosition : anotherUserPosition} className={currentHistory.amount < 0 ? "historyItem history green" : "historyItem history red"}>
                                        <p className="historyItemContent">{currentHistory.amount > 0 ? "+"+currentHistory.amount : currentHistory.amount}€</p>
                                        <p className="historyItemData">{currentHistory.date}</p>
                                    </div>
                                )
                            })
                        }

                    </section>

                    <section className="optionButtons">
                        <button className="grey" onClick={createFinishRequest}>Finalizar</button>
                        <button className="red" onClick={() => showMoneyAction(1)}><img src={moneyMoreIcon} /></button>
                        <button className="green" onClick={() => showMoneyAction(-1)}><img src={moneyLessIcon} /></button>
                    </section>
                </div>

                ) : (
                    moneyAction ? (
                        <div id="returnInfo" className="showViewAni moneyActionContainer">
                            <h1>Cantidad a {moneyActionType === 1 ? "aumentar" : "disminuir"}</h1>

                            <div className="inputContainer">
                                <input onChange={e => setSelectedMoney(e.target.value)} className="moneyInput" type="number" placeholder="€" /><p>€</p>                                
                            </div>

                            <div className="buttonsContainer">
                                <button className="cancel" onClick={hideMoneyAction}>Cancelar</button>
                                <button onClick={createPayment}>{moneyActionType === 1 ? "Aumentar" : "Disminuir"}</button>                                
                            </div>
                        </div>
                    ) : null
                )
            }
        </PopUp>
    )
}