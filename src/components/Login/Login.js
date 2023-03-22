import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);

    return(
        <div>
            <form style={{width:"30%", margin: "80px auto"}} id="login" onSubmit={onLoginSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>      
                <button style={{background:"green", border:"none"}}type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
} 