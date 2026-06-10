import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import foto2 from '../assets/foto2.png';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';
import foto5 from '../assets/pinpumpan.jpg';
import CustomTitle from '../components/CustomTitle'; 
import styles from './Ilustracion.module.css';



const IMAGENES_GALERIA = [
  { src: foto2, alt: 'Remeras' },
  { src: foto3, alt: 'Concurso Nacional de Ilustracion' },
  { src: foto4, alt: 'Ilustracion Acuarela' },
  { src: foto5, alt: 'Ilustracion Acrilico' },
];

const Ilustracion = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setSlidesCount(emblaApi.slideNodes().length);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);



  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);

  

  return (
  <section id="ilustracion" className={styles.ilustracion}>
 
  <div className={styles.titleWrapper}>
    <CustomTitle>
      Ilus<em>tra</em><br />ción
    </CustomTitle>
  </div>


      <div className={styles.galleryLayout}>
        <div className={styles.galleryMain}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {IMAGENES_GALERIA.map((imagen, idx) => (
                <div className={styles.emblaSlide} key={idx}>
                  <img
                    src={imagen.src}
                    alt={imagen.alt}
                    className={styles.emblaSlideImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.galleryMainCaption}>
            {IMAGENES_GALERIA[selectedIndex]?.alt}
          </div>
          <button className={`${styles.galNav} ${styles.galPrev}`} onClick={scrollPrev}>◀</button>
          <button className={`${styles.galNav} ${styles.galNext}`} onClick={scrollNext}>▶</button>
          <div className={styles.galCounter}>
            {selectedIndex + 1} / {slidesCount}
          </div>
        </div>

        <div className={styles.galleryThumbs}>
          {IMAGENES_GALERIA.map((imagen, idx) => (
            <img
              key={idx}
              src={imagen.src}
              alt={imagen.alt}
              className={`${styles.gthumb} ${idx === selectedIndex ? styles.active : ''}`}
              onClick={() => scrollTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ilustracion;