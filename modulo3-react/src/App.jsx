import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavDots from './components/NavDots';
import SectionReveal from './components/SectionReveal';

import ScrollProgress from './components/ScrollProgress';
import Hero from './pages/Hero';
import Biogr from './pages/Biogr';
import Ilustracion from './pages/Ilustracion';
import Grafico from './pages/DisenoGrafico'
import Tareas from './pages/Tareas'; 
import CalculadoraComisiones from './pages/calculadoraComisiones';
import Footermain from './pages/Footermain';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollProgress />
      <NavDots />
      <Routes>
        <Route path="/" element={
          <div className="one-page-layout">
            <div id="hero"><Hero /></div>
            <SectionReveal id="biogr"><Biogr /></SectionReveal>
<SectionReveal id="ilustracion"><Ilustracion /></SectionReveal>
<SectionReveal id="Grafico"><Grafico /></SectionReveal>
<SectionReveal id="tareas"><Tareas /></SectionReveal>
<SectionReveal id="CalculadoraComisiones"><CalculadoraComisiones /></SectionReveal>
            <div id="footermain"><Footermain /></div>
          </div>
        } />
      </Routes>
    </Router>
  );
}
export default App;