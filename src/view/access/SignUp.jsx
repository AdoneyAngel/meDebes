import { useEffect, useState } from "react"
import User from "../../model/User"

function SignUp() {
    const [name, setName] = new useState("")
    const [mail, setMail] = new useState("")
    const [password, setPassword] = new useState("")

    const [validNameMail, setValidNameMail] = new useState(false)

    const validateNameMail = async (e) => {
        e.preventDefault()

        //Check if mail exist

        await User.getUserByMail(mail).then(async mailRes => {
            
            if (mailRes.length === 0) {

                //If dont exist, check if name exist

                await User.getUserByName(name).then(nameRes => {
                    if (nameRes.length > 0) {
                        setValidNameMail(false)

                    } else {
                        setValidNameMail(true)
                    }
                })

            }
        })
    }

    useEffect(() => {
        if (validNameMail) {
            const dataForm = document.getElementById("dataForm")

            dataForm.setAttribute("class", "formContent formHidden")
        }
    }, [validNameMail])

    return (
        <div id="signUpView">
            <h1>Acceder</h1>
            <form onSubmit={e => validateNameMail(e)} className="formContent" id="dataForm">

                <label>Nombre</label>
                <input onChange={(e) => setName(e.target.value)} type="text" required/>
                <label>Correo electrónico</label>
                <input onChange={(e) => setMail(e.target.value)} type="email" required/>

                <button className="loginButton">Entrar</button>
            </form>

            {
                validNameMail ? (
                    <form id="passwordForm" className="formContent">
                        <label>Contraseña</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required/>
                        <button className="loginButton">Entrar</button>
                    </form>                    
                )  : null
            }


        </div>
    )
}

export default SignUp