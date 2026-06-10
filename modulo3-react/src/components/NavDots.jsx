import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import styles from './NavDots.module.css';

const NavDots = () => {
  // Pon aquí exactamente las secciones que quieres que tengan un puntito
  const secciones = [
    { id: 'hero', label: 'Inicio' },
    { id: 'biogr', label: 'Biografía' },
    { id: 'ilustracion', label: 'Ilustración' },
    {id: 'grafico', label: 'Diseño Grafico'},
    { id: 'tareasYgarabatos', label: 'Tareas y Garabatos' }
    
  ];

  return (
    <div className={styles.dotsContainer}>
      {secciones.map((seccion, index) => (
        <NavHashLink
          key={index}
          to={`/#${seccion.id}`} // 👈 Clave: Esto genera "/#hero", "/#biogr", etc.
          smooth
          className={styles.dot}
          activeClassName={styles.dotActive}
        >
          <span className={styles.tooltip}>{seccion.label}</span>
        </NavHashLink>
      ))}
    </div>
  );
};

export default NavDots;