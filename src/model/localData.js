class LocalData {
    static addData(name, value) {
        localStorage.setItem(name, value)
    }
    static getData(name) {
        return localStorage.getItem(name)
    }
    static isLogged() {
        const mail = localStorage.getItem("mail")
        const name = localStorage.getItem("name")
        const id = localStorage.getItem("id")
    
        if (mail && name && id) {
            if (mail !== undefined && name !== undefined && id !== undefined) {
                return true
            }
    
        } else {
            return false
        }
    }
    static login(id, mail, name) {
        this.addData("id", id)
        this.addData("mail", mail)
        this.addData("name", name)
    }
}

export default LocalData