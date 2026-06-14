import React from 'react';
import CustomTitle from "../components/CustomTitle";
import styles from './calculadoraComisiones.module.css';
import SectionNum from '../components/SectionNum';


import Calculadora from '../components/Calculadora'; 

const CalculadoraComisiones = () => {
  return (
    <section id="calculadora" className={styles.ilustracion}>
      
      <SectionNum num="01" />
      <div className="eyebrow r">Sección 01</div>
      
      <div className={styles.titleWrapper}>
       <CustomTitle>
  Calculadora <em>de</em><br />Comisiones
</CustomTitle>
      </div>

      
      <div className={styles.calculadoraWrapper}>
        <Calculadora />
      </div>
      
    </section>
  );
};

export default CalculadoraComisiones;