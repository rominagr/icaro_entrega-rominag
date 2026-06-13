import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionTemplate, animate } from 'motion/react';
import { useEffect } from 'react';

export default function SectionReveal({ children, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });

  const top    = useTransform(smoothProgress, [0, 100], ['50%', '0%']);
  const bottom = useTransform(smoothProgress, [0, 100], ['50%', '100%']);
  const clipPath = useMotionTemplate`polygon(0% ${top}, 100% ${top}, 100% ${bottom}, 0% ${bottom})`;

  useEffect(() => {
    if (isInView) {
      animate(rawProgress, 100, { duration: 0.9, ease: 'easeInOut' });
    }
  }, [isInView]);

  return (
    <motion.div id={id} ref={ref} style={{ clipPath }}>
      {children}
    </motion.div>
  );
}