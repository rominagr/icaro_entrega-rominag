import React from 'react';
import styles from './CustomTitle.module.css';

const CustomTitle = ({ children }) => {
  return (
    <h2 className={styles.bigTitle}>
      {children}
    </h2>
  );
};

export default CustomTitle;