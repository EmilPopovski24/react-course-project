import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Account.css";

export const Account = () => {

    const user = useContext(AuthContext);

    return (
            <div className="accpunt-page">  
                <h3 className="profile-header">My Account</h3>
                <p>Name: {user.userEmail} </p>
                <h5 className="profile-info">Personal Information</h5>
            </div>
    )
}