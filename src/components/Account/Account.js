import { useContext } from "react";
import "./Account.css";
import { AuthContext } from "../../contexts/AuthContext";

export const Account = () => {

    const user = useContext(AuthContext);

    return (
            <div>  
                <h3 className="profile-header">My Account</h3>
                <p>name: {user.userEmail} </p>
                <h5 className="profile-info">Personal Information</h5>
            </div>
    )
}