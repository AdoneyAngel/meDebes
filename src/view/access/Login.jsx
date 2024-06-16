function Login() {
    return (
        <div id="loginView">
            <h1>Acceder</h1>
            <form className="formContent">
                <label>Correo electrónico</label>
                <input type="mail" required/>
            </form>
        </div>
    )
}

export default Login