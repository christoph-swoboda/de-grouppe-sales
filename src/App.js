import './App.scss';
import React from "react";
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

function App() {

    const [{secretKey}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    return (
        <div className="App">
            <BrowserRouter>
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
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
