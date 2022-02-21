import logo from '../images/img_avatar2.png'
import '../css/login.css'
const Login = () => {

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form className="box">
                                <div className={"imgcontainer"}>
                                    <img className={"avatar"} src={logo} alt={"avatar"}/>
                                </div>
                                <p className="has-text-centered">{}</p>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******"  />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>

                                <div className={"container"}>
                                    <input type={"checkbox"}/>
                                    <label className={"rememberText"}>
                                        Remember me
                                    </label>
                                </div>

                                <hr/>
                                <div className={"container"}>
                                    {/*<button type={"button"} className={"cancelbtn"}>Cancel</button>*/}
                                    <span className={"psw"}>Forgot <a href={"#"}>password?</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;