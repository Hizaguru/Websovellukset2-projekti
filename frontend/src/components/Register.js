import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import '../css/register.css'
import logo from "../images/eventhandler.png";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    /**
     * Registers user into the database.
     * @author Jukka-Pekka Lappalainen
     * **/
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/credentials', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword

            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <div className="container">
            <form onSubmit={Register} className="box">
                <h1 className={"header"}>Register</h1>
                <div className={"imagecontainer"}>
                    <img src={logo} className={"avatar"} alt={"avatar"}/>
                </div>
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">

                    <label className="label">Name</label>
                    <div className="controls">
                        <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label">Email</label>
                    <div className="controls">
                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label">Password</label>
                    <div className="controls">
                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="field mt-5">
                    <label className="label">Confirm Password</label>
                    <div className="controls">
                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                    </div>
                </div>
                <div className="field mt-5">
                    <button className="button is-success is-fullwidth">Register</button>
                </div>
                <div>
                    <span className={"psw"}>Already have an <a href={"/"}><u>account?</u></a></span>
                </div>
            </form>
        </div>



    )
}

export default Register