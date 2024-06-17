import { useState } from "react"
import NotifyErr from "../../components/Notify"
import User from "../../model/User"
import FullScreenLoading from "../../components/FullScreenLoading"
import { Link, useNavigate } from "react-router-dom"

function Login() {

    const routerNavigation = useNavigate()

    const [mail, setMail] = new useState("")
    const [password, setPassword] = new useState("")

    //NotifyErr
    const [notifyErr, setNotifyErr] = new useState(false)
    const [notifyErrTxt, setNotifyErrTxt] = new useState("")
    const [typeNotify, setTypeNotify] = useState("")

    //Set loading
    const [fullScreenLoading, setFullScreenLoading] = new useState(false)

    const disableInputs = () => {
        document.querySelectorAll("form input").forEach(input => input.setAttribute("disabled", true))
    }
    const enableInputs = () => {
        document.querySelectorAll("form input").forEach(input => input.removeAttribute("disabled"))
    }

    const showFullScreenLoading = () => {
        setFullScreenLoading(true)

        disableInputs()
    }
    const hiddeFullScreenLoading = () => {
        setFullScreenLoading(false)

        enableInputs()
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

        User.login(mail, password).then(async res => {
            hiddeFullScreenLoading()

            if (res) {
                console.log("Login susccessfull")
                setTypeNotify("")
                showNotifyErr("Se ha iniciado sesion, configurando...")

                //If login is successfull, get the user profile to get the name

                showFullScreenLoading()

                User.loginLocal(mail)
                .then(() => {
                    hiddeFullScreenLoading()

                    routerNavigation("/")
                })

            } else {
                showNotifyErr("Correo o contraseña incorrecta")
                setTypeNotify("err")
            }
        })
    }

    return (
        <div id="loginView">
            {notifyErr ? <NotifyErr text={notifyErrTxt} onClick={hiddeNotifyErr} type={typeNotify}/> : null}
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