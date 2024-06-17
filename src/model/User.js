import Axios from "axios"
import LocalData from "./localData"

class User {
    constructor(name, mail) {
        this.name = name
        this.mail = mail
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
            return res.data[0]
        })
    }

    static async getUserByMail(mail) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserByMail", {mail})
        .then(res => {
            return res.data[0]
        })
    }

    static async getUserProfileByMail(mail) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getUserProfileByMail", {mail})
        .then(res => {
            return res.data
        })
    }

    static async loginLocal(mail) {
        await this.getUserProfileByMail(mail).then(userProfile => {
            LocalData.login(mail, userProfile.name)

            return true
        })
    }
}

export default User