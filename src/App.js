import './App.scss';
import React, {useEffect} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes, HashRouter} from 'react-router-dom';
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Login from "./pages/login";
import Register from "./pages/register";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {RouteData} from "./router/index";

function App() {

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="App">
            <HashRouter>
                <Navbar/>
                <Routes>
                    <Route path='*' exact element={<Navigate to="/"/>}/>
                    {
                        RouteData.map(route => (
                            <Route key={route.id} path={route.path}
                                   element={user ? route.component : <Navigate to={route.redirection}/>}/>
                        ))
                    }
                    <Route path="/anmeldung" element={!user ? <Login/> : <Navigate to="/"/>}/>
                    {/*<Route path="/registrieren" element={!user ? <Register/> : <Navigate to="/"/>}/>*/}
                </Routes>
                <Footer/>
            </HashRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
