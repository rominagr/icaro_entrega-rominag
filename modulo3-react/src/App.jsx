import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useWindowSize } from './hooks/useWindowSize';
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import Biogr from './pages/Biogr'
import Ilustracion from './pages/Ilustracion'
import Tareas from './pages/Tareas';
import Footermain from './pages/Footermain'
import './App.css'


function App() {
  const [count, setCount] = useState(0);
  
  const { width } = useWindowSize(); 


  const esMovil = width < 768; 

  return (
    <>
      <Router>
        <Navbar esMovil={esMovil} />
        <Hero />
        <Biogr />
        <Ilustracion esMovil={esMovil} />
        <Tareas/>
        <Footermain />
      </Router>
    </>
  );
}

export default App;