'use client';
import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); 
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, [role='button'], input, textarea, select, label");
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setOuterPosition(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const speed = 0.10;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animationRef.current = requestAnimationFrame(followCursor);
    };

    animationRef.current = requestAnimationFrame(followCursor);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position]);

  // const cursorColor = hovering ? "sky-600" : "sky-300";

  return (
    <>
      <div
        style={{ top: position.y, left: position.x }}
        className={clsx(
          "fixed w-1 h-1 rounded-full pointer-events-none z-[1000]",
          "transition-transform duration-0 ease-in -translate-x-1/2 -translate-y-1/2",
          `${hovering ? "bg-sky-600" : "bg-red-300"}`,
          'hidden md:block'
        )}
      />

      <div
        style={{ top: outerPosition.y, left: outerPosition.x }}
        className={clsx(
          "fixed w-10 h-10 rounded-full pointer-events-none z-[1000]",
          "transition-transform duration-100 ease-in -translate-x-1/2 -translate-y-1/2",
          `border-2 ${hovering ? "border-blue-400" : "border-sky-300"}`,
          clicked ? "scale-75 opacity-50" : hovering ? "scale-125 opacity-90" : "scale-[0.9] opacity-80",
          'hidden md:block'
        )}
      />

      {clicked && (
        <div
          style={{ top: position.y, left: position.x }}
          className={clsx(
            "fixed w-12 h-12 rounded-full pointer-events-none z-30",
            "transition-opacity duration-300 ease-out -translate-x-1/2 -translate-y-1/2",
            `bg-red-700}`,
            "opacity-100 animate-ping",
            'hidden md:block'
          )}
        />
      )}
    </>
  );
};

export default Cursor;
