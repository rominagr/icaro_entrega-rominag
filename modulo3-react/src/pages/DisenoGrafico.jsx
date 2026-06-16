import React, { useState } from 'react';
import CustomTitle from "../components/CustomTitle";
import GraficoCard from "../components/GraficoCard";
import styles from "./Grafico.module.css";
import SectionNum from '../components/SectionNum';

const proyectos = [
  {
    num: '01',
    title: 'Identidad Visual Systema',
    tags: ['Branding', 'Logotipo', 'Paleta'],
    claseCard: 'r rl rd1',
    previewLabel: 'Identidad Visual Systema',
    previewDesc: 'Desarrollo de identidad de marca completa, incluyendo el diseño del logotipo interactivo, la selección de la paleta cromática brutalista y la tipografía del sistema.',
    img: './src/assets/image.png',
    behanceUrl: 'https://www.behance.net/gallery/239781311/Panel-Sala-Verdi',
  },
  {
    num: '02',
    title: 'Campaña Gráfica',
    tags: ['Poster', 'Campaña', 'Digital'],
    claseCard: 'r rl rd3',
    previewLabel: 'Proyecto Afiche - Sala Verdi',
    previewDesc: 'Afiche realizado para el proyecto de Branding de la Sala Verdi. A través de los conceptos generados en el manual de marca se generaron varios afiches para el proyecto.',
    img: './src/assets/image.png',
    behanceUrl: 'https://www.behance.net/gallery/239771153/Manual-de-Marca-Sala-Verdi-DCV4',
  },
  {
    num: '03',
    title: 'Sistema de Iconografía',
    tags: ['Iconos', 'Sistema', 'UI Kit'],
    claseCard: 'r rl rd4',
    previewLabel: 'Sistema de Iconografía',
    previewDesc: 'Creación de un set de iconos vectoriales consistentes desde cero para aplicaciones modernas, optimizados para interfaces oscuras y con un grosor de trazo unificado.',
    img: './src/assets/image.png',
    behanceUrl: 'https://www.behance.net/gallery/250956523/Proyecto-Diploma-Diseno-UXUI-STM',
  },
];

const Grafico = () => {
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
              proyecto={{ ...proyecto, claseCard: `${styles.graficoCard} ${proyecto.claseCard}` }}
              esActivo={proyectoActivo.num === proyecto.num}
              alEntrarMouse={() => setProyectoActivo(proyecto)}
            />
          ))}
        </div>

        {/* Columna Derecha */}
        <div className={`${styles.graficoRight} r rr`}>
          <div className={styles.grPreview}>
            <img
              src={proyectoActivo.img}
              alt={proyectoActivo.previewLabel}
              className={styles.imgPreview}
            />
          </div>
          <div className={styles.grLabel}>{proyectoActivo.previewLabel}</div>
          <p className={styles.grDesc}>{proyectoActivo.previewDesc}</p>

          {proyectoActivo.behanceUrl && (
            <a
              href={proyectoActivo.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.behanceLinkPreview}
            >
              Ver proyecto completo en Behance ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Grafico;