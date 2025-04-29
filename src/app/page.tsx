import React from "react";
import Heading from "./components/Heading";
import Contact from "./components/Contact";
import {Hero} from "./components/Hero";

const page = () => {
    return (
        <div
            id="bg"
            className=""
        >
            <div className="flex flex-col md:flex-row md:justify-between md:px-20 pt-10">
                <Heading />
                <Contact />
            </div>
            <div>
              <Hero />
            </div>
        </div>
    );
};

export default page;
