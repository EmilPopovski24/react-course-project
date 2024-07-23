import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import "./Login.css";

const Loginkeys = {
    Email: 'email',
    Password: 'password', 
};

export const Login = () => {
    
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmitfunc } = useForm({
        [Loginkeys.Email]: "",
        [Loginkeys.Password]: "",
    }, onLoginSubmit)

    return(

        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmitfunc} method="POST" style={{width:"40%", margin: "80px auto"}} >
                <h1 className="login-header">Login</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name={Loginkeys.Email} type="email" className="form-control" id="email" value={values[Loginkeys.Email]} onChange ={changeHandler} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name={Loginkeys.Password} type="password" className="form-control" id="password" value={values[Loginkeys.Password]} onChange ={changeHandler}/>
                </div>      
                <button style={{background:"green", border:"none"}} type="submit" className="btn btn-primary">Login</button>
                <div className="registeroption">
                    <p className="registerOptionText">
                        You don't have a profile? ... Come on... Go to <Link to={"/register"}> Register page </Link>
                    </p>
                </div>
            </form>
        </section>
    )
} 