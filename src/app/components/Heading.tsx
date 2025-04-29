import React from "react";
import { Special_Elite } from "next/font/google";
import { Typewriter } from "./TypeWriter";


const special_elite = Special_Elite({
    weight : "400",
    subsets: ["latin"]
})

const Heading = () => {
    return (
        <div className="p-10">
            <div className={`${special_elite.className} text-gray-100 text-5xl text-center`}>
                Shreyash Daware
            </div>
            <div className={`${special_elite.className} text-2xl tracking-wider text-center`}>
                <span>
                    <Typewriter
                        text={[
                            "Frontend Developer",
                            "React Enthusiast",
                            "Tech Enthusiast",
                        ]}
                        typingSpeed={20}
                        eraseSpeed={20}
                        pauseTime={1000}
                        loop
                        showCursor
                        className={`text-xl  text-blue-50 ${special_elite.className}`}
                    />
                </span>
            </div>
        </div>
    );
};

export default Heading;
