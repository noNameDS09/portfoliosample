import React from "react";
import { Typewriter } from "./TypeWriter";
import { Aboreto } from "next/font/google";

const aboreto = Aboreto({
    weight : "400",
    subsets : ["latin"]
})

const Heading = () => {
    return (
        <div className=" flex flex-col w-fit justify-center items-center fixed top-10 backdrop-blur-[4px] rounded-2xl px-10 py-4">
            <div className={`${aboreto.className} text-gray-100 text-xl text-center`}>
                <Typewriter text={["Shreyash Daware"]} />
                
            </div>
        </div>
    );
};

export default Heading;
