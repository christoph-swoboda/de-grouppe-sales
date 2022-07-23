import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./layouts/navbar";
import Dashboard from "./pages/dashboard";
import Footer from "./layouts/footer";
import NewCreation from "./pages/newCreation";
import BestantList from "./pages/bestantList";
import Bestant from "./pages/bestant";
import UserManagement from "./pages/userManagement";

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route path='*' exact element={<Navigate to="/"/>}/>
                  <Route path="/" element={!user ? <Dashboard/> : <Navigate to="/login"/>}/>
                  <Route path="/new" element={!user ? <NewCreation/> : <Navigate to="/login"/>}/>
                  <Route path="/benutzerverwaltung" element={!user ? <UserManagement role={1}/> : <Navigate to="/login"/>}/>
                  <Route path="/bestant-list" element={!user ? <BestantList/> : <Navigate to="/login"/>}/>
                  <Route path="/bestant/:id" element={!user ? <Bestant/> : <Navigate to="/login"/>}/>
              </Routes>
              <Footer/>
          </Router>
      </div>
  );
}

export default App;
