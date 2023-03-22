import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home"
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { Register } from "./components/Register/Register";


function App() {
    // keep authentication data
    const [auth, setAuth] = useState([]);

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const loginData = Object.fromEntries(new FormData(e.target))
        // console.log(Object.fromEntries(new FormData(e.target)));
        console.log(loginData)
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
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
