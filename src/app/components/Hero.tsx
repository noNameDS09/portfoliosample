import React from "react";
import { Amatic_SC } from "next/font/google";
import { Typewriter } from "./TypeWriter";

const amatic_SC = Amatic_SC({
    weight: "700",
    subsets: ["latin"],
});

const Hero = () => {
    return (
        <div className="p-10">
            <div className={`${amatic_SC.className} text-white text-5xl`}>
                Shreyash Daware
            </div>
            <div className={`${amatic_SC.className} text-2xl tracking-wider`}>
                <span>
                    <Typewriter
                        text={[
                            "Frontend Developer",
                            "React Enthusiast",
                            "JavaScript Developer",
                            "Tech Enthusiast",
                        ]}
                        typingSpeed={20}
                        eraseSpeed={20}
                        pauseTime={1000}
                        loop
                        showCursor
                        className={`text-2xl font-mono text-blue-50 ${amatic_SC.className}`}
                    />
                </span>
            </div>
        </div>
    );
};

export default Hero;
