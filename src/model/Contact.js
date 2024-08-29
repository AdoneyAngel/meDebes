import Axios from "axios";
import DateTime from "../model/DateTime"

export default class Contact {
    static async getContacs (id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getContactsById", {id})
        .then(res => {
            return res.data[0]
        })
    }

    static async getContactProfile(user_from, user_to) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getContactProfile", {user_from, user_to})
        .then(res => {
            return res.data
        })
    }

    static async getContacsProfiles (id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getContactsProfileById", {id})
        .then(res => {
            return res.data[0]
        })
    }

    static async addContact (id_from, id_to, nickname) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/addContact", {id_from, id_to, nickname})
        .then(res => {
            return res.data
        })
    }

    static async deleteContact (id_from, id_to) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/deleteContact", {id_from, id_to})
        .then(res => {
            return res.data
        })
    }

    static async renameContact (id_from, id_to, nickname) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/renameContact", {id_from, id_to, nickname})
        .then (res => {
            return res.data
        })
    }
    
    static async createRequest (id_from, id_to, nickname) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/createContactRequest", {user_from: id_from, user_to: id_to, nickname})
        .then (res => {
            if (res) {
                return res.data
            }
        })
    }

    static async getWaitingRequests_to(id_to) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getWaitingContactRequest", {user_to: id_to})
        .then (res => {
            if (res) {
                return res.data[0].map(req => {
                    return {
                        ...req,
                        date: DateTime.mysqlToApp(req.date)
                    }
                })
            }
        })
    }

    static async acceptRequest (id, nickname) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/acceptContactRequest", {id, nickname})
        .then (res => {
            return res.data
        })
    }

    static async rejectRequest(id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/rejectContactRequest", {id})
        .then (res => {
            return res.data
        })
    }
}