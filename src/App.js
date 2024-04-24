import './App.scss';
import React, {useEffect, useState} from "react";
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Login from "./pages/login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {RouteData} from "./router/index";
import ResetPassword from "./pages/resetPassword";
import SubmitPassword from "./pages/resetPassword/partial/submitPassword";
import {AES, enc} from "crypto-js";
import {useStateValue} from "./states/StateProvider";
import packageJson from "../package.json";

function App() {

    const [{secretKey}] = useStateValue();
    let user=''

    try {
        const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
        user=JSON.parse(decryptedBytes.toString(enc.Utf8))
    }
    catch (e){
        window.localStorage.removeItem('user')
    }
    useEffect(() => {

        let version = localStorage.getItem('version');
        if (version !== packageJson.version) {
            if ('caches' in window) {
                caches.keys().then((names) => {
                    // Delete all the cache files
                    names.forEach(name => {
                        caches.delete(name);
                    })
                });

                // Makes sure the page reloads. Changes are only visible after you refresh.
                window.location.reload(true);
            }

            localStorage.clear();
            localStorage.setItem('version', packageJson.version);
        }
    }, []);

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
                    <Route path="/reset-password" element={!user ?<ResetPassword/>:<Navigate to="/"/>}/>
                    <Route path="/reset-password/:email/:token" element={!user ?<SubmitPassword/>:<Navigate to="/"/>}/>
                    {/*<Route path="/registrieren" element={!user ? <Register/> : <Navigate to="/"/>}/>*/}
                </Routes>
                <Footer/>
            </HashRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
