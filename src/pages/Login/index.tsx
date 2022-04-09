import { Component, createSignal } from "solid-js"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { login } from "../../services/auth.services"
import authStore from "../../stores/auth.store"
import './Login.scss'

interface LoginProps {

}

const Login: Component<LoginProps> = (props) => {
    const [email, setEmail] = createSignal('')
    const [password, setPassword] = createSignal('')

    async function handleLogin(event: Event) {
        const [auth, setAuth] = authStore;
        const response = await login(email(), password());
        setAuth(response);
    }

    return (
        <div class="login-page" >
            <div className="login-form">
                <div className="login-form__textfields">
                    <TextField onChange={setEmail} type="email" label="Email" />
                    <TextField onChange={setPassword} type="password" label="Mot de passe" />
                </div>
                <div className="login-form__btns">
                    <Button onClick={handleLogin}>
                        Connexion
                    </Button>
                    <span>-- ou --</span>
                    <Button variant='outlined' >
                        Crée un compte
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Login
