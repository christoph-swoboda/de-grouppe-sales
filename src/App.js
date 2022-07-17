import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from "./layouts/navbar";

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={!user ? <Navigate to="/login"/> : <Navigate to="/"/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;
