import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

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
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" value={values.email} onChange={changeHandler} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" value={values.password} onChange={changeHandler} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input name="confirm-password" value={values["confirm-password"]} onChange={changeHandler} type="password" className="form-control" id="confirm-password" />
                </div>      
                <button style={{background:"green", border:"none"}}type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}