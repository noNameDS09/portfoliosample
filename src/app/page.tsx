import React from "react";
import Heading from "./components/Hero/Heading";
import Contact from "./components/Hero/Contact";
import { Hero } from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";

const page = () => {
    return (
        <div className="">
            <div
                id="bg"
                >
                <div
                className="flex flex-col md:flex-row md:justify-between md:px-20 pt-5"
                >
                    <Heading />
                    <Contact />
                </div>
                <div>
                    <Hero />
                </div>
            </div>
            <div>
                <Projects />
            </div>
        </div>
    );
};

export default page;
