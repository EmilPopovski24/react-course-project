import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { movieServiceFactory } from "./services/movieService";
import { RouteGuard } from "./components/guards/RouteGuard"
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
import { Account } from "./components/Account/Account"

function App() {
    //keep movies data
    const [movies, setMovies] = useState([]);
    const movieService = movieServiceFactory(); 
    const navigator = useNavigate();
    
    useEffect(() => {
        if(movies.length > 0) {
            movieService.getAllMovies()
            .then(result => {
                setMovies(result)
            })
        }
    },[]);

    const onCreateMovieSubmit = async(data) => {
        // console.log(data);
        const newMovie = await movieService.createMovie(data);
        setMovies(state => [...state, newMovie]);
        navigator('/catalog');
    }  

    const onEditMovieSubmit = async (values) => {
        const result = await movieService.editMovie(values._id, values);
        // console.log(`onEdit - ${result}`)
        setMovies(oldstate => oldstate.map(x => x._id === values._id ? result : x))
        navigator(`/catalog`);
        return result
    }

  return (
    <AuthProvider>
    <div>
        <Navbar />
            <main id="main">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<Catalog movies={movies} />} />
                <Route element ={<RouteGuard />} >
                    <Route path="/account" element={<Account />} />
                    <Route path='/catalog/:movieId' element={<Details />} />
                    <Route path="/addmovie" element={<AddMovie onCreateMovieSubmit={onCreateMovieSubmit} />} />
                    <Route path="/catalog/:movieId/edit" element={<EditMovie onEditMovieSubmit={onEditMovieSubmit} />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;
