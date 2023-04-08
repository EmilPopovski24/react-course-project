import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authServiceFactory } from "../services/authenticationService"
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken);
    const navigator = useNavigate();

    const onRegisterSubmit = async (data) => {
        if (data["confirm-password"] !== data.password) {
            alert("Both passwords do not match")
            return {}; 
        }

        try {
            const result = await authService.register(data);
            setAuth(result)
            navigator("/")
        } catch(error) {
            console.log("Incorrect details")
        }    
    }

    const onLoginSubmit = async(data)=> {
        try {
             const result = await authService.login(data);
             setAuth(result)
             navigator("/catalog")
         } catch(error) {
             console.log("Incorrect login details")
             alert("Incorrect login details")
         }    
     };

    const onLogout = () => {
        authService.logout();
        setAuth({});
    }

    const userAuthContext = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={userAuthContext}>
                {children}
            </AuthContext.Provider> 
        </>
        
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context
}