import Axios from "axios"
import LocalData from "./localData"

class User {
    constructor() {
        this.name = ""
        this.mail = ""
    }

    static async createUser(name, mail, password) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/createUser", {name, mail, password})
        .then(res => {
            return res.data
        })
    }

    static async login(mail, password) {
        if (mail && password) {
            return await Axios.post(process.env.REACT_APP_API_URL + "/login", {mail, password})
            .then(res => {
                return res.data
            })
        }
    }

    static async getUsers() {        

        return await Axios.get(process.env.REACT_APP_API_URL + "/getUsers").then(res => {
            return res.data[0]
        })
    }

    static async getUserByName(name) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserByName", {name})
        .then(res => {
            return res.data[0][0]
        })
    }

    static async getUserByMail(mail) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserByMail", {mail})
        .then(res => {
            return res.data[0][0]
        })
    }

    static async getUserProfileByMail(mail) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserProfileByMail", {mail})
        .then(res => {
            return res.data[0][0]
        })
    }

    static async getUserProfile (id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserProfile", {id})
        .then(res => {
            return res.data[0][0]
        })
    }

    static async loginLocal(mail) {
        return await this.getUserByMail(mail).then(userProfile => {

            LocalData.login(userProfile.id, mail, userProfile.name)

            return true
        })
    }

    static async getUserProfileByInfo (info) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserByInfo", {info})
        .then(res => {
            if (res.data[0][0]) {
                const data = res.data[0][0]

                const profile = {
                    id: data.id,
                    name: data.name,
                    mail: data.mail
                }

                return profile        

            } else {
                return false
            }
        })
    }

    static async userHaveNotifications (userId) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/userHaveNotification", {id: userId})
        .then(res => {
            return res.data[0].have == 1
        })
    }
}

export default User