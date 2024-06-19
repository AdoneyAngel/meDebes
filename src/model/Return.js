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
                let date = current.date.split("T")[0].replaceAll("-", "/")
                let hour = current.date.split("T")[1].split("Z")[0]
                
                date = date.split("/")
                date = date[2]+"/"+date[1]+"/"+date[0]

                hour = hour.slice(0, hour.length-4)

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
                let date = current.date.split("T")[0].replaceAll("-", "/")
                let hour = current.date.split("T")[1].split("Z")[0]
                
                date = date.split("/")
                date = date[2]+"/"+date[1]+"/"+date[0]

                hour = hour.slice(0, hour.length-4)

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
                let date = current.date.split("T")[0].replaceAll("-", "/")
                let hour = current.date.split("T")[1].split("Z")[0]
                
                date = date.split("/")
                date = date[2]+"/"+date[1]+"/"+date[0]

                hour = hour.slice(0, hour.length-4)

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
            console.log(res.data)
            return res.data
        })
    }
    static async rejectCreation (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectCreation", {id: request_id})
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }
    static async acceptHistory (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/acceptHistory", {id: request_id})
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }
    static async rejectHistory (request_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectHistory", {id: request_id})
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }
}