import Axios from "axios"

export default class History {
    static async getFullHistory(user_id) {
        let history = []

        //Get creation requests

        await Axios.post(process.env.REACT_APP_API_URL + "/getAllCreationRequests_user", {user_id})
        .then (res => {
            if (res.data) {
                history = [...history,
                    ...res.data[0].map(resItem => {
                        return {...resItem, type: "create"}
                    })
                ]

            }
        })

        //Get payment history

        await Axios.post(process.env.REACT_APP_API_URL + "/getAllHistoryRequests_user", {user_id})
        .then(res => {
            if (res.data) {
                history = [...history,
                    ...res.data[0].map(resItem => {
                        return {...resItem, type: "payment"}
                    })
                ]
            }
        })

        //Get finish requests

        await Axios.post(process.env.REACT_APP_API_URL + "/getAllFinishRequests_user", {user_id})
        .then(res => {
            if (res.data) {
                history = [...history,
                    ...res.data[0].map(resItem => {
                        return {...resItem, type: "finish"}
                    })
                ]
            }
        })

        //Get all returns 

        await Axios.post(process.env.REACT_APP_API_URL + "/getAllReturns_user", {user_id})
        .then(res => {
            if (res.data) {
                history = [...history,
                    ...res.data[0].map(resItem => {
                        return {...resItem, type:"return"}
                    })
                ]
            }
        })

        //Get all contact requests

        await Axios.post(process.env.REACT_APP_API_URL + "/getAllContactRequests_user", {user_id})
        .then(res => {
            if (res.data) {
                history = [...history,
                    ...res.data[0].map(resItem => {
                        return {...resItem, type:"contact"}
                    })
                ]
            }
        })

        //Ordenate history

        history.sort((itemA, itemB) => {
            return new Date(itemB.date) - new Date(itemA.date)
        })
        
        return history
    }
}