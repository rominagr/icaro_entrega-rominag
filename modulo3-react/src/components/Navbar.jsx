import styles from './Navbar.module.css';
import logotipoImg from '../assets/logotipo@2x.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light p-md-1" id="nav">
      <div className="container"> 
        <a className="navbar-brand fw-bold letter-spacing-2" href="#">
          {/* Aquí usamos la variable con llaves {} */}
          <img className="logo" src={logotipoImg} alt="logo" height="40" />
        </a>

        <button 
          className="navbar-toggler nav-toggler-custom" 
          type="button" 
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain" 
          aria-controls="navbarMain" 
          aria-expanded="false" 
          aria-label="Abrir menú"
        >
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
          <span className="toggler-bar"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#ilustracion">Ilustración</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#grafico">Gráfico</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#tipografia">Tipografía</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#uxui">UX / UI</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#tareas">Tareas</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#contacto">Contacto</a></li>
            <li className="nav-item"><a className="nav-link nav-custom-link" href="#calculadora">Calculadora</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;