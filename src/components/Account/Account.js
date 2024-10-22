import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Account.css";

export const Account = () => {

    const user = useContext(AuthContext);

    return (
            <div className="account-page">  
                <h3 className="profile-info">Personal Information</h3>
                <p>Uername: {user.userEmail.split('@')[0]} </p>
                <p>Email: {user.userEmail} </p>
            </div>
    )
}