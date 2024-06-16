import { useState } from "react"
import User from "../../model/User"

function SignUp() {
    const [name, setName] = new useState("")
    const [mail, setMail] = new useState("")
    const [password, setPassword] = new useState("")

    const [validNameMail, setValidNameMail] = new useState(false)

    const validateNameMail = async (e) => {
        e.preventDefault()

        await User.getUserByMail(mail).then(res => {
            console.log(res)
        })
    }

    return (
        <div id="loginView">
            <h1>Acceder</h1>
            <form onSubmit={e => validateNameMail(e)} className="formContent">

                <label>Nombre</label>
                <input onChange={(e) => setName(e.target.value)} type="text" required/>
                <label>Correo electrónico</label>
                <input onChange={(e) => setMail(e.target.value)} ype="mail" required/>

                <button className="loginButton">Entrar</button>
            </form>
        </div>
    )
}

export default SignUp