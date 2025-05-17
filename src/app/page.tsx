"use client";
import React, { useRef } from "react";
import Heading from "./components/Hero/Heading";
import Contact from "./components/Hero/Contact";
import { Hero } from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import { TechStack } from "./components/TechStack/Techstack";
import Cursor from "./components/CustomCursor/Cursor";
import StickyCursor from "./components/CustomCursor/StickyCursor/MagneticCursor";

const Page = () => {
  const stickyElement = useRef(null);
  return (
    <>
      <Cursor />
      <div className="">
        <div id="bg">
          <div className="flex flex-col justify-center items-center md:flex-row md:justify-between md:px-20 pt-5 ">
            <Heading />

            <Contact ref={stickyElement} />
            <StickyCursor stickyElement={stickyElement} />
          </div>
          <div>
            <Hero />
          </div>
        </div>
        <div>
          <Projects />
        </div>
        <div className="w-screen h-screen bg-[#0e0e0e]">
          <TechStack />
        </div>
      </div>
    </>
  );
};

export default Page;
