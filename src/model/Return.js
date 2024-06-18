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
    static async getCreationRequests(user_id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getCretionRequests_to", {id: user_id})
        .then(res => {
            return res.data[0].map (current => {
                const date = current.date.split("T")[0].replaceAll("-", "/")
                let hour = current.date.split("T")[1].split("Z")[0]
                
                hour = hour.slice(0, hour.length-4)

                return {
                    ...current,
                    date: date + " " + hour
                }
            })
        })
    }
}