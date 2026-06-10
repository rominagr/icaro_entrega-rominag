import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavDots from './components/NavDots';


import Hero from './pages/Hero';
import Biogr from './pages/Biogr';
import Ilustracion from './pages/Ilustracion';
import Grafico from './pages/DisenoGrafico'
import Tareas from './pages/Tareas'; 
import Footermain from './pages/Footermain';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <NavDots /> 

      <Routes>
        <Route path="/" element={
          <div className="one-page-layout">
            <div id="hero"><Hero /></div>
            <div id="biogr"><Biogr /></div>
            <div id="ilustracion"><Ilustracion /></div>
            <div id='Grafico'><Grafico /></div>
            <div id="tareas"><Tareas /></div> 
            <div id="footermain"><Footermain /></div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;