'use client';
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const Cursor = () => {
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, [role='button'], input, textarea, select, label");
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className={clsx(
          "fixed w-1 h-1 rounded-full pointer-events-none z-[1000]",
          "transform -translate-x-1/2 -translate-y-1/2",
          hovering ? "bg-blue-600" : "bg-sky-300",
          'hidden md:block'
        )}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      <motion.div
        className={clsx(
          "fixed w-10 h-10 rounded-full pointer-events-none z-[1000]",
          "border-2 transform -translate-x-1/2 -translate-y-1/2",
          hovering ? "border-blue-400" : "border-sky-300",
          'hidden md:block'
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: clicked ? 0.75 : hovering ? 1.25 : 0.9,
          opacity: clicked ? 0.5 : hovering ? 0.9 : 0.8,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 200,
        }}
      />

      <AnimatePresence>
        {clicked && (
          <motion.div
            className={clsx(
              "fixed w-12 h-12 rounded-full pointer-events-none z-30",
              "bg-blue-700/50 transform -translate-x-1/2 -translate-y-1/2",
              'hidden md:block'
            )}
            style={{
              x: cursorX,
              y: cursorY,
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Cursor;