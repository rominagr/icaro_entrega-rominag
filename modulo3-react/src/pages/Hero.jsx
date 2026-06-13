import React from 'react';
import styles from './Hero.module.css';
import miLogo from '../assets/logogato.png'; 

const Hero = () => {
  return (
    <> 
      <section className={styles.hero}>
        
        {/* Contenedor principal con Flexbox para alinear los textos (izq) y el logo (der) */}
        <div className={`${styles.heroContent} d-flex flex-column flex-md-row align-items-center justify-content-between gap-5`}>
          
          {/* COLUMNA IZQUIERDA: Mantiene intacta tu estructura original de textos */}
          <div className={styles.heroTextSide}>
            <div className={styles.heroRow}>
              
              <div className={styles.heroTitleWrap}>
                <h1 className={`${styles.bigTitle} r`}>
                  <em>Portfolio</em><br />
                  Romina Garcia
                </h1>
              </div>

              <div className={`${styles.heroMeta} r rd2`}>
                <p className={styles.heroDesc}>
                  Portfolio de diseño creativo — ilustración, gráfico, tipografía y experiencias digitales hechas con intención.
                </p>
                <div className={styles.heroScroll}>
                  <div className={styles.scrollLine}></div>
                  Scroll para explorar
                </div>
              </div>

            </div>
          </div>

          {/* COLUMNA DERECHA: Tu logo ubicado de forma independiente en su lugar ideal */}
          <div className={`${styles.heroLogoSide} d-flex justify-content-center justify-content-md-end`}>
            <div className={styles.logoWrapper}>
              <img src={miLogo} alt="Romina Garcia Logo" className={styles.heroLogo} />
            </div>
          </div>

        </div>

        

        <div className={`${styles.heroTags} r rd4 d-flex flex-wrap gap-2 justify-content-start`}>
          <span className={styles.htag}>Ilustración</span>
          <span className={styles.htag}>Diseño Gráfico</span>
          <span className={styles.htag}>Tipografía</span>
          <span className={styles.htag}>UX / UI</span>
          <span className={styles.htag}>Branding</span>
        </div>
      </section>
    </>
  );
};

export default Hero;