import React from "react";
// import { Aboreto } from "next/font/google";
import MyThree from "../DecodeVision/Three";
// import { useGSAP } from "@gsap/react";

// const aboreto = Aboreto({
//     weight: "400",
//     subsets: ["latin"],
// });
const Projects = () => {
    return (
        <main className="w-screen h-screen">
            {/* <header
                className={`${aboreto.className} text-center text-3xl py-5`}
            >
                My Works
            </header> */}
            <MyThree />
        </main>
    );
};

export default Projects;
