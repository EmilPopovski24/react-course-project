import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import "./Register.css"

export const Register = () => {
    
    const { onRegisterSubmit } = useContext(AuthContext)
    const { values, changeHandler, onSubmitfunc} = useForm({
        email:"",
        password: "",
        "confirm-password":"",
    }, onRegisterSubmit);

    return(
        <div>
            <form style={{width:"30%", margin: "80px auto"}} id="register-form" onSubmit={onSubmitfunc} method="POST">
                <h1 className="register-header">Register</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" value={values.email} onChange={changeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" value={values.password} onChange={changeHandler} type="password" className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input name="confirm-password" value={values["confirm-password"]} onChange={changeHandler} type="password" className="form-control" id="confirm-password" required/>
                </div>      
                <button style={{background:"green", border:"none"}} type="submit" className="btn btn-primary">Register</button>
                <div className="loginoption">
                    <p className="loginOptionText">
                        You already have a profile? ... Come on... Go to the<Link to={"/login"}> Login page </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}