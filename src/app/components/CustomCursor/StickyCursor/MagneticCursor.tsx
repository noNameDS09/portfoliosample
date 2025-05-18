'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';
import styles from './style.module.scss';

export default function StickyCursor({ stickyElement }: { stickyElement: React.RefObject<any> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const baseSize = 15;
  const hoverSize = 60;
  const cursorSize = isHovered ? hoverSize : baseSize;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const rotate = useMotionValue('0rad');

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    if (isHovered && stickyElement?.current) {
      const { left, top, width, height } = stickyElement.current.getBoundingClientRect();
      const centerX = left + width ;
      const centerY = top + height ;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      mouseX.set(centerX - cursorSize / 2 + distanceX * 0.1);
      mouseY.set(centerY - cursorSize / 2 + distanceY * 0.1);

      const absDistance = Math.max(Math.abs(distanceX), Math.abs(distanceY));
      scaleX.set(transform([0, width / 2], [1, 1.3])(absDistance));
      scaleY.set(transform([0, height / 2], [1, 0.8])(absDistance));

      rotate.set(`${Math.atan2(distanceY, distanceX)}rad`);
    } else {
      mouseX.set(clientX - cursorSize / 2);
      mouseY.set(clientY - cursorSize / 2);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    animate([scaleX, scaleY],  { duration: 0.2, type: 'spring' });
    animate(rotate, '0rad', { duration: 0.2 });
  };

  useEffect(() => {
    const el = stickyElement?.current;
    if (!el) return;

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, stickyElement]);

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        ref={cursorRef}
        className={styles.cursor}
        style={{
          left: smoothX,
          top: smoothY,
          scaleX,
          scaleY,
          rotate,
          width: cursorSize,
          height: cursorSize,
        }}
        // transformTemplate={({ rotate, scaleX, scaleY }) => 
        //   `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
        // }
      />
    </div>
  );
}