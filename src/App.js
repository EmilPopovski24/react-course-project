import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import * as movieService from "./services/movieService";
import * as authenticationService from "./services/authenticationService";

import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { AddMovie } from "./components/AddMovie/AddMovie";
import { Details } from "./components/Details/Details";


function App() {
    // keep authentication data
    const [auth, setAuth] = useState({});
    //keep movies data
    const [movies, setMovies] = useState([]);
    //
    const navigator = useNavigate();
    useEffect(() => {
        movieService.getAllMovies()
            .then(result => {
                // console.log(result);
                setMovies(result)
            })
    }, []);

    const onCreateMovieSubmit = async (data) => {
        // console.log(data);
        const newMovie = await movieService.create(data);
        setMovies(state => [...state, newMovie]);
        
        navigator('/catalog');
    }

    const onLoginSubmit = async(data)=> {
       try {
        const result = await authenticationService.login(data);
        setAuth(result)
        navigator("/catalog")
    } catch(error) {
        console.log("Incorrect login details")
        alert("Incorrect login details")
    }    
        // e.preventDefault();
        // const loginData = Object.fromEntries(new FormData(e.target));
        // console.log(loginData)
        // console.log(data);
        // console.log(Object.fromEntries(new FormData(e.target)));
        // console.log(data)
    };

    const onRegisterSubmit = async (data) => {
    // to think about validation of password/confirm-password 

        try {
            const result = await authenticationService.register(data);
            setAuth(result)
            navigator("/")
        } catch(error) {
            console.log("Incorrect details")
        }    
    }

    const onLogout = async () => {
        authenticationService.logout();
        setAuth({});
    }

    const loginContext = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        userToken: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    

  return (
    <AuthContext.Provider value={loginContext}>
    <div>
        <Navbar />
            <main id="main">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<Catalog movies={movies} />} />
                <Route path="/catalog/:movieId" element={<Details />} />
                <Route path="/addmovie" element={<AddMovie onCreateMovieSubmit={onCreateMovieSubmit} />} />
                <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
