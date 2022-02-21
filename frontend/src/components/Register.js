import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import '../css/register.css'

/**
 * @author Jukka-Pekka Lappalainen
 * Creates the user and pushes the data to the database.
 * **/
const Register = () => {
    //hooks for setting the values to the database
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',)
        }catch (error){
            if(error.response) {
                setMessage(error.response.data.message);
            }
        }

    }
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <h5>Register</h5>
                                <p1>Please fill the form</p1>
                                <hr/>
                                <p className="has-text-centered">{message}</p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                               value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                    <label className="label">Confirm Password</label>
                                    <div className="">
                                        <input type="password" className="input" placeholder="******"
                                               value={confirmationPassword}
                                               onChange={(e) => setConfirmationPassword(e.target.value)} />
                                </div>
                                <div className="field mt-5">
                                    <button className="" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register