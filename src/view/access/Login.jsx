function Login() {
    return (
        <div id="loginView">
            <h1>Acceder</h1>
            <form className="formContent">
                <label>Correo electrónico</label>
                <input type="mail" required/>
                <label>Contraseña</label>
                <input type="password" required/>
                <button className="loginButton">Entrar</button>
            </form>
        </div>
    )
}

export default Login