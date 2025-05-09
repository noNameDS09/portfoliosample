'use client';
import React, { useEffect, useState } from "react";
import clsx from "clsx";

// Tailwind-safe classes
const COLOR_CLASSES: Record<string, string> = {
  button: "orange-500",
  a: "neutral-500",
  default: "sky-500",
};

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState<string>(COLOR_CLASSES.default);
  const [clicked, setClicked] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const tag = target.closest("button, a");
      const tagName = tag?.tagName.toLowerCase();

      if (tagName && COLOR_CLASSES[tagName]) {
        setCursorColor(COLOR_CLASSES[tagName]);
        setHovering(true);
      } else {
        setCursorColor(COLOR_CLASSES.default);
        setHovering(false);
      }
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

  return (
    <>

      {/* Inner Dot */}
      <div
        style={{ top: position.y, left: position.x }}
        className={clsx(
          "fixed w-1 h-1 rounded-full pointer-events-none z-[1000]",
          "transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2",
          `bg-${cursorColor}`
        )}
      />

      {/* Outer Ring */}
      <div
        style={{ top: position.y, left: position.x }}
        className={clsx(
          "fixed w-10 h-10 rounded-full pointer-events-none z-[1000]",
          "transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2",
          `border-2 border-${cursorColor}`,
          clicked ? "scale-75 opacity-50" : hovering ? "scale-125 opacity-90" : "scale-[0.9] opacity-80"
        )}
      />

      {/* Click Pulse Effect */}
      {clicked && (
        <div
          style={{ top: position.y, left: position.x }}
          className={clsx(
            "fixed w-12 h-12 rounded-full pointer-events-none z-30",
            "transition-opacity duration-300 ease-out -translate-x-1/2 -translate-y-1/2",
            `bg-${cursorColor}`,
            "opacity-20 animate-ping"
          )}
        />
      )}
    </>
  );
};

export default Cursor;
