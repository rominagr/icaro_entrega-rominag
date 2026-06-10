import styles from './Footermain.module.css';

const Footermain = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.containerFluid}>
        <span className={styles.ftBrand}>
          Romina Garcia ✦ Portfolio — 2026
        </span>
      </div>
    </footer>
  );
};

export default Footermain;