import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { movieServiceFactory } from "./services/movieService";
import { authServiceFactory } from "./services/authenticationService";
// import { useService } from "./hooks/useService";

import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { AddMovie } from "./components/AddMovie/AddMovie";
import { Details } from "./components/Details/Details";
import { EditMovie } from "./components/EditMovie/EditMovie";


function App() {
    // keep authentication data
    const [auth, setAuth] = useState({});
    //keep movies data
    const [movies, setMovies] = useState([]);
    const movieService = movieServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken);
    const navigator = useNavigate();
    

    useEffect(() => {
        movieService.getAllMovies()
            .then(result => {
                setMovies(result)
            })
    },[]);

    const onCreateMovieSubmit = async(data) => {
        // console.log(data);
        const newMovie = await movieService.createMovie(data);
        setMovies(state => [...state, newMovie]);
        navigator('/catalog');
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

    const onRegisterSubmit = async (data) => {
        if (data["confirm-password"] !== data.password) {
            alert("Both passwords do not match")
            return {};
        
        }
        // const { confirmPassword, ...registerData } = values;
        // if (confirmPassword !== registerData.password) {
        //     return;
        // }

        try {
            const result = await authService.register(data);
            setAuth(result)
            navigator("/")
        } catch(error) {
            console.log("Incorrect details")
        }    
    }

    const onEditMovieSubmit = async (values) => {
        const result = await movieService.editMovie(values._id, values);
        console.log(`onEdit - ${result}`)
        setMovies(oldstate => oldstate.map(x => x._id === values._id ? result : x))
        navigator(`/catalog`);
        return result
    }

    const onLogout = () => {
        authService.logout();
        setAuth({});
    }

    const loginContext = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
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
                <Route path='/catalog/:movieId' element={<Details />} />
                <Route path="/addmovie" element={<AddMovie onCreateMovieSubmit={onCreateMovieSubmit} />} />
                <Route path="/catalog/:movieId/edit" element={<EditMovie onEditMovieSubmit={onEditMovieSubmit} />} />
                <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
