import Axios from "axios"

class User {
    constructor(name, mail) {
        this.name = name
        this.mail = mail
    }

    static async createUser(name, mail, password) {
        Axios.get(process.env.REACT_APP_API_URL + "/")
    }

    static async login(mail, password) {
        
    }

    static async getUsers() {        

        Axios.get(process.env.REACT_APP_API_URL + "/getUsers").then(res => {
            return res.data
        })
    }
}

export default User