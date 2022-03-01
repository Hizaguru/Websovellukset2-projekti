import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/login.css'
import logo from '../images/lukeIsStrong.jpg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            console.log("try in login")
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/ProfilePage");
        } catch (error) {
            console.log("error")
            console.log(email, " ", password)
            if (error.response) {
                console.log(error.response.data.msg)
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <div className={"imagecontainer"}>
                                    <img src={logo} className={"avatar"} alt={"avatar"}/>
                                </div>
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                    <div className={"container"}>
                                        <span className={"psw"}>Don't have an <a href={"/register"}><u>account?</u></a></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login