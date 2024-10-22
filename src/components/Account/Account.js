import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Account.css";

export const Account = () => {

    const user = useContext(AuthContext);

    return (
            <div className="account-page">  
                <h3 className="profile-info">Personal Information</h3>
                <ul>
                    <li className="account-details">Username: {user.userEmail.split('@')[0]} </li>
                    <li className="account-details">Email: {user.userEmail} </li>
                </ul>
            </div>
    )
}