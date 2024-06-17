class LocalData {
    static addData(name, value) {
        localStorage.setItem(name, value)
    }
    static getData(name) {
        localStorage.getItem(name)
    }
    static isLogged() {
        const mail = localStorage.getItem("mail")
        const name = localStorage.getItem("name")
    
        if (mail && name) {
            return true
    
        } else {
            return false
        }
    }
    static login(mail, name) {
        this.addData("mail", mail)
        this.addData("name", name)
    }
}

export default LocalData