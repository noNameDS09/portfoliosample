"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/app/lib/utils";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}

export const TextRevealCard: React.FC<TextRevealCardProps> = ({
  text,
  revealText,
  children,
  className,
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(width);
    }
  }, []);

  const mouseMoveHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  };

  const mouseLeaveHandler = () => {
    setIsMouseOver(false);
    setWidthPercentage(0);
  };

  const mouseEnterHandler = () => setIsMouseOver(true);

  const touchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  };

  const rotateDeg = widthPercentage * 0.1;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn("w-[50rem] rounded-lg p-8 relative overflow-hidden", className)}
    >
      {children}

      <div className="relative flex items-center overflow-hidden">
        {/* Revealed Text */}
        <motion.div
          style={{ width: "100%" }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.5 }}
          className="absolute  bg-[#0e0e0e] z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-[1.5rem] sm:text-[2rem] py-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-50 text-center"
          >
            {revealText}
          </p>
        </motion.div>

        {/* Animation line */}
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b absolute z-50 will-change-transform"
        ></motion.div>

        {/* Original Text */}
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
          style={{ width: "100%" }}
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-[1.5rem] sm:text-[2rem] py-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-50 text-center"
          >
            {text}
          </p>
          {/* <MemoizedStars /> */}
        </div>
      </div>
    </div>
  );
};

interface TextRevealCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const TextRevealCardTitle: React.FC<TextRevealCardTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

interface TextRevealCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const TextRevealCardDescription: React.FC<TextRevealCardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>
      {children}
    </p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: "2px",
            height: "2px",
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

// export const MemoizedStars = memo(Stars);
