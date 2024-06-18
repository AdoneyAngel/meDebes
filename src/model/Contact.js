import Axios from "axios";

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
}