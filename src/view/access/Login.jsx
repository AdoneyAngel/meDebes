import { useState } from "react"
import NotifyErr from "../../components/Notify"
import User from "../../model/User"
import FullScreenLoading from "../../components/FullScreenLoading"
import { Link } from "react-router-dom"

function Login() {

    const [mail, setMail] = new useState("")
    const [password, setPassword] = new useState("")

    //NotifyErr
    const [notifyErr, setNotifyErr] = new useState(false)
    const [notifyErrTxt, setNotifyErrTxt] = new useState("")

    //Set loading
    const [fullScreenLoading, setFullScreenLoading] = new useState(false)

    const showFullScreenLoading = () => {
        setFullScreenLoading(true)
    }
    const hiddeFullScreenLoading = () => {
        setFullScreenLoading(false)
    }

    const showNotifyErr = (text) => {
        setNotifyErr(false)
        
        setTimeout(() => {
            setNotifyErrTxt(text)
            setNotifyErr(true)            
        }, 100);
    }
    const hiddeNotifyErr = () => {
        setNotifyErr(false)
        setNotifyErrTxt("")
    }

    const login = async (e) => {
        e.preventDefault()

        hiddeNotifyErr()
        showFullScreenLoading()

        User.login(mail, password).then(res => {
            hiddeFullScreenLoading()

            if (res) {
                console.log("Login susccessfull")

            } else {
                showNotifyErr("Correo o contraseña incorrecta")
            }
        })
    }

    return (
        <div id="loginView">
            {notifyErr ? <NotifyErr text={notifyErrTxt} onClick={hiddeNotifyErr}/> : null}
            {fullScreenLoading ? <FullScreenLoading /> : null} 
            <h1>Acceder</h1>
            <form onSubmit={e => login(e)} className="formContent">
                <label>Correo electrónico</label>
                <input onChange={(e) => setMail(e.target.value)} type="email" required/>
                <label>Contraseña</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" required/>
                <Link className="switchFormButton" to="/access/signup">Crear cuenta</Link>
                <button className="loginButton">Entrar</button>
            </form>
        </div>
    )
}

export default Login