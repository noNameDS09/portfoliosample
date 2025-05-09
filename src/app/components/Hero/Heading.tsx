import React from "react";
// import { Special_Elite } from "next/font/google";
// import { Typewriter } from "./TypeWriter";
import { Aboreto } from "next/font/google";

const aboreto = Aboreto({
    weight : "400",
    subsets : ["latin"]
})

const Heading = () => {
    return (
        <div className=" flex flex-col w-fit justify-center items-center">
            <div className={`${aboreto.className} text-gray-100 text-xl text-center mt-10`}>
                Shreyash Daware
            </div>
            {/* <div className={`${aboreto.className} text-4xl tracking-wider text-center`}>
                <span>
                    Web Developer
                </span>
            </div> */}
        </div>
    );
};

export default Heading;
