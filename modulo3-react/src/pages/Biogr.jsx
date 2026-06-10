import styles from './Biogr.module.css';

const Biogr = () => {
  return (
    <section id="biogr" className={styles.biogr}>
      <div className={`${styles.biogrInner} row gy-4 align-items-center`}>
        
        <div className={`${styles.biogrStatement} r rl col-12 col-md-6`}>
          Diseño no es decoración.<br />
          Es <strong>resolver</strong> con forma,<br />
          comunicar con <strong>precisión</strong>,<br />
          emocionar con <strong>método</strong>.
        </div>
        
        <div className={`${styles.biogrRight} col-12 col-md-6`}>
          
          <p className={`${styles.biogrBio} r rr rd1 p-md-2`}>
            Diseñadora creativa y estudiante con experiencia construyendo identidades visuales,
            sistemas tipográficos y experiencias digitales.
          </p>

          <div className={`${styles.skillsList} r rr rd3`}>
            <span className={styles.skillTag}>Figma</span>
            <span className={styles.skillTag}>Illustrator</span>
            <span className={styles.skillTag}>InDesign</span>
            <span className={styles.skillTag}>Prototyping</span>
            <span className={styles.skillTag}>Brand Systems</span>
            <span className={styles.skillTag}>HTML/CSS</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Biogr;