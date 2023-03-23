import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import * as movieService from "./services/movieService";

import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";
import { AddMovie } from "./components/AddMovie/AddMovie";
import { Details } from "./components/Details/Details";


function App() {
    // keep authentication data
    const [auth, setAuth] = useState([]);
    //keep movies data
    const [movies, setMovies] = useState([]);
    //

    useEffect(() => {
        movieService.getAllMovies()
            .then(result => {
                console.log(result);
                setMovies(result)
            })
    }, []);

    const onCreateMovieSubmit = async (data) => {
        // console.log(data);
        const newMovie = await movieService.create(data);
        setMovies(state => [...state, newMovie]);
        // !!! to check how to use navigate
        // navigate('/catalog');
    }

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const loginData = Object.fromEntries(new FormData(e.target));
        console.log(loginData)
        // console.log(Object.fromEntries(new FormData(e.target)));
        // console.log(data)
    }

  return (
    <AuthContext.Provider value={{onLoginSubmit}}>
    <div>
        <Header />
            <main id="main">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<Catalog movies={movies} />} />
                <Route path="/catalog/:id" element={<Details />} />
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
