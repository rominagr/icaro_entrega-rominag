import styles from './Hero.module.css';

const Hero = () =>{
return(
 <> 
   <section className={styles.hero}>

  <div className={styles.heroContent}>
  
    <div className={`${styles.heroRow} row gy-4`}>
      
     
      <div className={`${styles.heroTitleWrap} col-12 col-md-6`}>
        <h1 className={`${styles.bigTitle} r`}>
          <em>Portfolio</em><br />
          Romina Garcia
        </h1>
      </div>

      
      <div className={`${styles.heroMeta} r rd2 col-12 col-md-6`}>
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

  <div className={`${styles.heroLine} r rd3`}></div>

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