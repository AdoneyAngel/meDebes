import { useEffect, useState } from "react"
import User from "../../model/User"
import NotifyErr from "../../components/Notify"
import FullScreenLoading from "../../components/FullScreenLoading"
import { Link } from "react-router-dom"


function SignUp() {
    const [name, setName] = new useState("")
    const [mail, setMail] = new useState("")
    const [password, setPassword] = new useState("")

    const [validNameMail, setValidNameMail] = new useState(false)
    const [fullScreenLoading, setFullScreenLoading] = new useState(false)
    
    //Message error states
    const [notifyErrTxt, setNotifyErrTxt] = new useState("")
    const [notifyErr, setNotifyErr] = new useState(false)

    //Méthods
    const showNotifyErr = (txt) => {
        setNotifyErr(false)
        
        setTimeout(() => {
            setNotifyErrTxt(txt)
            setNotifyErr(true)            
        }, 100);
    }
    const hiddeNotifyErr = () => {
        setNotifyErr(false)
        setNotifyErrTxt("")
    }

    const showFullScreenLoading = () => {
        setFullScreenLoading(true)
    }
    const hiddeFullScreenLoading = () => {
        setFullScreenLoading(false)
    }

    const validateNameMail = async (e) => {
        e.preventDefault()

        //Set loading
        showFullScreenLoading()

        //Check if mail exist

        await User.getUserByMail(mail).then(async mailRes => {
            
            if (mailRes.length === 0) {

                //If dont exist, check if name exist

                await User.getUserByName(name).then(nameRes => {
                    if (nameRes.length > 0) {
                        setValidNameMail(false)
                        showNotifyErr("El nombre ya está en uso")
                        hiddeFullScreenLoading()

                    } else {
                        setValidNameMail(true)
                        hiddeFullScreenLoading()
                    }
                })

            } else {
                showNotifyErr("El correo electrónico ya está en uso")
                hiddeFullScreenLoading()
                
            }
        })
    }

    const signUp = async (e) => {
        e.preventDefault()


        if (password.length > 0) {
            showFullScreenLoading()
            hiddeNotifyErr()
            
            User.createUser(name, mail, password).then(res => {
                hiddeFullScreenLoading()

                console.log(res)

                if (res) {
                    console.log("Sign up successfull")

                } else {
                    console.log("Sign up failed")
                    showNotifyErr("Ha ocurrido algo al intentar iniciar sesion")
                }
            })
        }
    }

    useEffect(() => {
        if (validNameMail) {
            const dataForm = document.getElementById("dataForm")

            dataForm.setAttribute("class", "formContent formHidden")
        }
    }, [validNameMail])

    return (
        <div id="signUpView">
            {fullScreenLoading ? <FullScreenLoading /> : null}
            {
                notifyErr ? <NotifyErr text={notifyErrTxt} onClick={hiddeNotifyErr}/> : null
            }
            <h1>Crear cuenta</h1>
            <form onSubmit={e => validateNameMail(e)} className="formContent" id="dataForm">

                <label>Nombre</label>
                <input onChange={(e) => setName(e.target.value)} type="text" required/>
                <label>Correo electrónico</label>
                <input onChange={(e) => setMail(e.target.value)} type="email" required/>

                <Link className="switchFormButton" to="/access/login">Ya tienes cuenta</Link>

                <button className="loginButton">Crear</button>
            </form>

            {
                validNameMail ? (
                    <form onSubmit={e => signUp(e)} id="passwordForm" className="formContent">
                        <label>Contraseña</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required/>
                        <button className="loginButton">Crear</button>
                    </form>                    
                )  : null
            }


        </div>
    )
}

export default SignUp