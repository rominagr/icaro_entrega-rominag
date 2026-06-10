import React, { useState } from 'react';
import CustomTitle from "../components/CustomTitle";
import GraficoCard from "../components/GraficoCard";
import styles from "./Grafico.module.css";
import SectionNum from '../components/SectionNum';

const Grafico = () => {
  const proyectos = [
    {
      num: '01',
      title: 'Identidad Visual Systema',
      tags: ['Branding', 'Logotipo', 'Paleta'],
      claseCard: `${styles.graficoCard} r rl rd1`,
      previewLabel: 'Identidad Visual Systema',
      previewDesc: 'Desarrollo de identidad de marca completa, incluyendo el diseño del logotipo interactivo, la selección de la paleta cromática brutalista y la tipografía del sistema.',
      img: './src/assets/image.png'
    },
    {
      num: '02',
      title: 'Campaña Gráfica',
      tags: ['Poster', 'Campaña', 'Digital'],
      claseCard: `${styles.graficoCard} r rl rd3`,
      previewLabel: 'Proyecto Afiche - Sala Verdi',
      previewDesc: 'Afiche realizado para el proyecto de Branding de la Sala Verdi. A través de los conceptos generados en el manual de marca se generaron varios afiches para el proyecto.',
      img: './src/assets/image.png'
    },
    {
      num: '03',
      title: 'Sistema de Iconografía',
      tags: ['Iconos', 'Sistema', 'UI Kit'],
      claseCard: `${styles.graficoCard} r rl rd4`,
      previewLabel: 'Sistema de Iconografía',
      previewDesc: 'Creación de un set de iconos vectoriales consistentes desde cero para aplicaciones modernas, optimizados para interfaces oscuras y con un grosor de trazo unificado.',
      img: './src/assets/image.png'
    }
  ];

  const [proyectoActivo, setProyectoActivo] = useState(proyectos[1]);

  return (
    <section id="grafico" className={styles.graficoSection}>

  <SectionNum num="02" />
      
      <div className="eyebrow r">Sección 02</div>
      
      <div className={styles.titleWrapper}>
        <CustomTitle>Diseño<br /><em>Gráfico</em></CustomTitle>
      </div>

      <div className={styles.graficoLayout}>
        {/* Columna Izquierda */}
        <div className={styles.graficoLeft}>
          {proyectos.map((proyecto) => (
            <GraficoCard
              key={proyecto.num}
              proyecto={proyecto} 
              esActivo={proyectoActivo.num === proyecto.num} 
              alEntrarMouse={() => setProyectoActivo(proyecto)} 
            />
          ))}
        </div>

        {/* Columna Derecha (Se mantiene igual) */}
        <div className={`${styles.graficoRight} r rr`}>
          <div className={styles.grPreview}>
            <img src={proyectoActivo.img} alt={proyectoActivo.previewLabel} className={styles.imgPreview} />
          </div>
          <div className={styles.grLabel}>{proyectoActivo.previewLabel}</div>
          <p className={styles.grDesc}>{proyectoActivo.previewDesc}</p>
        </div>
      </div>
    </section>
  );
};

export default Grafico;