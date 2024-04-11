import "./Account.css";

export const Account = ({
    username
}) => {

    return (
            <div>  
                <h3 className="profile-header">My Account</h3>
                <p>name: {username} </p>
                <h5 className="profile-info">Personal Information</h5>
            </div>
    )
}