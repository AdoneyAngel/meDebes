import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import HistoryModel from "../../model/History"
import LoadingIcon from "../LoadingIcon";
import HistoryContentContact from "./HistoryContentContact.jsx";
import LocalData from "../../model/localData.js";

import "../../styles/history.css"
import HistoryContentFinish from "./HistoryContentFinish.jsx";
import HistoryContentPayment from "./HistoryContentPayment.jsx";
import HistoryContentReturn from "./HistoryContentReturn.jsx";
import HistoryContentCreate from "./HistoryContentCreate.jsx";

export default function History ({close, id}) {
    
    const [history, setHistory] = new useState([])
    const [loading, setLoading] = new useState(false)

    const loadHistory = async () => {
        setLoading(true)

        HistoryModel.getFullHistory(id)
        .then (res => {
            setHistory(res)

            setLoading(false)
        })
    }

    useEffect(() => {
        loadHistory()
    }, [])

    return (
        <PopUp onClick={close}>
            <h1 className="defaultPopUpTitle">Historial</h1>
            {loading ? <LoadingIcon /> : null}

            <div className="historyList">
                {
                    history.map((historyItem, index) => {
                        return (
                            <div key={index}>
                            {
                                historyItem.type == "contact" ? <HistoryContentContact item={historyItem} user_id={LocalData.getData("id")}/> : null
                            }
                            {
                                historyItem.type == "finish" ? <HistoryContentFinish item={historyItem} user_id={LocalData.getData("id")}/> : null
                            }
                            {
                                historyItem.type == "payment" ? <HistoryContentPayment item={historyItem} user_id={LocalData.getData("id")}/> : null
                            }
                            {
                                historyItem.type == "return" ? <HistoryContentReturn item={historyItem} user_id={LocalData.getData("id")}/> : null
                            }
                            {
                                historyItem.type == "create" ? <HistoryContentCreate item={historyItem} user_id={LocalData.getData("id")}/> : null
                            }
                            </div>
                        )
                    })
                }
            </div>
        </PopUp>
    )
}