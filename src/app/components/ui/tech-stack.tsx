"use client";
import { cn } from "@/app/lib/utils";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationControls,
} from "framer-motion";

const springConfig = {
  stiffness: 100,
  damping: 50,
  mass: 0.5,
};

export const DraggableCardBody = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig
  );
  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig
  );

  // Debounced resize update
  useEffect(() => {
    const updateConstraints = () => {
      if (cardRef.current && typeof window !== "undefined") {
        const cardRect = cardRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const horizontalMargin = (windowWidth - cardRect.width) / 2;
        const verticalMargin = (windowHeight - cardRect.height) / 2;

        setConstraints({
          top: -verticalMargin - 100,
          left: -horizontalMargin - 30,
          right: horizontalMargin + 20,
          bottom: verticalMargin + 300,
        });
      }
    };

    const resizeObserver = () => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(updateConstraints, 100);
      };
    };

    updateConstraints();
    const handleResize = resizeObserver();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        cardRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      dragElastic={0.5}
      dragTransition={{
        bounceStiffness: 500,
        bounceDamping: 10,
        power: 0.1,
      }}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={() => {
        document.body.style.cursor = "default";
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-52 w-fit overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-900",
        className
      )}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("[perspective:100vw]", className)}>{children}</div>
  );
};
