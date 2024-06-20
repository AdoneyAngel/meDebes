import Axios from "axios";

export default class Return {
    static async getTotalReturn_to(id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getTotalReturn_to", {id})
        .then(res => {
            if (res.data[0][0].total == null) {
                return 0
                
            }
            return res.data[0][0].total
        })
    }
    static async getTotalReturn_from(id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getTotalReturn_from", {id})
        .then(res => {
            if (res.data[0][0].total == null) {
                return 0

            }
            return res.data[0][0].total
        })
    }
    static async getReturnsData_to(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getReturnsData_to", {id: user_id})
        .then(res => {
            return res.data[0]
        })   
    }
    static async getReturnsData_from(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getReturnsData_from", {id: user_id})
        .then(res => {
            return res.data[0]
        })   
    }
    static async getCreationRequests_to(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getCreationRequests_to", {id: user_id})
        .then(res => {
            return res.data[0].map (current => {
                const dateData = new Date(current.date)
                
                const date = dateData.getDate()+"/"+dateData.getMonth()+1+"/"+dateData.getFullYear()
                const hour = dateData.getHours()+":"+ (dateData.getMinutes()===0?"00":dateData.getMinutes())

                return {
                    ...current,
                    date: date + " " + hour
                }
            })
        })
    }
    static async getHistoryRequests_to(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getHistoryRequests_to", {id: user_id})
        .then(res => {
            return res.data[0].map (current => {
                const dateData = new Date(current.date)
                
                const date = dateData.getDate()+"/"+dateData.getMonth()+1+"/"+dateData.getFullYear()
                const hour = dateData.getHours()+":"+ (dateData.getMinutes()===0?"00":dateData.getMinutes())

                return {
                    ...current,
                    date: date + " " + hour
                }
            })
        })
    }
    static async getFinishRequests_to(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getFinishRequests_to", {id: user_id})
        .then(res => {
            return res.data[0].map (current => {
                const dateData = new Date(current.date)
                
                const date = dateData.getDate()+"/"+dateData.getMonth()+1+"/"+dateData.getFullYear()
                const hour = dateData.getHours()+":"+ (dateData.getMinutes()===0?"00":dateData.getMinutes())

                return {
                    ...current,
                    date: date + " " + hour
                }
            })
        })
    }
    static async acceptCreation (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/acceptCreation", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async rejectCreation (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectCreation", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async acceptHistory (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/acceptHistory", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async rejectHistory (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectHistory", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async acceptFinish (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/acceptFinish", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async rejectFinish (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectFinish", {id: request_id})
        .then(res => {
            return res.data
        })
    }
    static async createReturnRequest (user_from, user_to, money, concept) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/createCreationRequest", {user_from, user_to, money, concept})
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }
    static async getReturnData(return_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getReturnData", {id: return_id})
        .then(res => {
            return res.data[0][0]
        })
    }
    static async getReturnHistory(return_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getReturnHistory", {id: return_id})
        .then (res => {
            return res.data[0]
        })
    }
    static async createPaymentRequest (id, user_from, amount) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/createPaymentRequest", {id, user_from, amount})
        .then (res => {
            return res.data
        })
    }
    static async createFinishRequest (id, user_from) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/createFinishRequest", {id, user_from})
        .then (res => {
            return res.data
        })
    }
}