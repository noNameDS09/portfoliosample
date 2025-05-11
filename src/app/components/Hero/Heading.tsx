import React from "react";
import { Typewriter } from "./TypeWriter";
import { Aboreto } from "next/font/google";

const aboreto = Aboreto({
    weight : "400",
    subsets : ["latin"]
})

const Heading = () => {
    return (
        <div className=" flex flex-col w-fit justify-center items-center">
            <div className={`${aboreto.className} text-gray-100 text-xl text-center`}>
                <Typewriter text={["Shreyash Daware"]} />
                
            </div>
        </div>
    );
};

export default Heading;
