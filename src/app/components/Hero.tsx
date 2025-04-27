import React from "react";
import { Amatic_SC } from "next/font/google";

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
                Hi,
                <span>
                    {"I'm Shreyash, a frontend developer who enjoys building clean and responsive websites. I work with HTML, CSS, JavaScript, and React to create user-friendly web experiences. I'm always learning and love turning ideas into real, functional designs."}
                </span>
            </div>
        </div>
    );
};

export default Hero;
