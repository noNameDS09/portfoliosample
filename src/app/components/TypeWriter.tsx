"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import React, { useEffect, useState } from "react";

interface TypewriterProps extends HTMLMotionProps<"p"> {
    text: string[];
    typingSpeed?: number;
    eraseSpeed?: number;
    pauseTime?: number;
    loop?: boolean;
    showCursor?: boolean;
    className?: string;
}

export const sentenceVariants = {
    visible: (i: number) => ({
        transition: {
            staggerChildren: i,
        },
    }),
};

export const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.05 } },
};

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    typingSpeed = 50,
    eraseSpeed = 30,
    pauseTime = 2000,
    loop = true,
    showCursor = true,
    className = "",
    ...rest
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = text[currentIndex % text.length];
        let timer: NodeJS.Timeout;

        if (!isDeleting && displayText.length < current.length) {
            timer = setTimeout(() => {
                setDisplayText(current.slice(0, displayText.length + 1));
            }, typingSpeed);
        } else if (isDeleting && displayText.length > 0) {
            timer = setTimeout(() => {
                setDisplayText(current.slice(0, displayText.length - 1));
            }, eraseSpeed);
        } else if (!isDeleting && displayText.length === current.length) {
            timer = setTimeout(() => {
                if (loop || currentIndex < text.length - 1) {
                    setIsDeleting(true);
                }
            }, 2000);
        } else if (isDeleting && displayText.length === 0) {
            setIsDeleting(false);
            setCurrentIndex((prev) =>
                loop ? (prev + 1) % text.length : prev + 1
            );
        }

        return () => clearTimeout(timer);
    }, [
        displayText,
        isDeleting,
        currentIndex,
        text,
        typingSpeed,
        eraseSpeed,
        pauseTime,
        loop,
    ]);

    return (
        <motion.p
            className={`${className} whitespace-pre-wrap break-words`}
            variants={sentenceVariants}
            custom={0.03}
            initial="hidden"
            animate="visible"
            {...rest}
        >
            <motion.span variants={letterVariants}>{displayText}</motion.span>
            {showCursor && <span className="ml-1 blinking-cursor">|</span>}
        </motion.p>
    );
};
