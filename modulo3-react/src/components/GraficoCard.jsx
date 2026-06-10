import React from 'react';
import styles from '../pages/Grafico.module.css'; // Apunta a tu archivo de estilos para heredar los hovers

const GraficoCard = ({ proyecto, esActivo, alEntrarMouse }) => {
  return (
    <div
      className={`${proyecto.claseCard} ${esActivo ? styles.cardActiva : ''}`}
      onMouseEnter={alEntrarMouse} // Ejecuta la función para cambiar la vista previa
    >
      <div className={styles.gcNum}>{proyecto.num}</div>
      <div className={styles.gcTitle}>{proyecto.title}</div>
      
      <div className={styles.gcTags}>
        {proyecto.tags.map((tag, index) => (
          <span key={index} className={styles.gcTag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GraficoCard;