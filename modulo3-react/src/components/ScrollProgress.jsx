import React, { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

   
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={styles.progressBar}
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollProgress;