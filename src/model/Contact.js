import Axios from "axios";

export default class Contact {
    static async getContacs (id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getContactsById", {id})
        .then(res => {
            return res.data[0]
        })
    }

    static async getContacsProfiles (id) {
        return await Axios.post(process.env.REACT_APP_API_URL + "/getContactsProfileById", {id})
        .then(res => {
            return res.data[0]
        })
    }
}