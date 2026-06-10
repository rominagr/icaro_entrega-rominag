import React from 'react';
import styles from './SectionNum.module.css';

const SectionNum = ({ num }) => {
  // Si por alguna razón te olvidas de pasarle un número, no renderiza nada para no romper el layout
  if (!num) return null;

  return (
    <div className={styles.sectionNum} aria-hidden="true">
      {num}
    </div>
  );
};

export default SectionNum;