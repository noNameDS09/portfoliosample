"use client";
import React, { useRef } from "react";
import Heading from "./components/Hero/Heading";
import Contact from "./components/Hero/Contact";
// import { Hero } from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import { TechStack } from "./components/TechStack/Techstack";
import Cursor from "./components/CustomCursor/Cursor";
// import StickyCursor from "./components/CustomCursor/StickyCursor/MagneticCursor";
import "../app/globals.css";
import Image from "next/image";
const Page = () => {
  // const stickyElement = useRef<HTMLElement | null>(null);
  return (
    <div className="bg-[#0e0e0e]">
      <Cursor />
      <section className=" ">
        <nav>
          <Heading />
          {/* <Contact ref={stickyElement} /> */}
            {/* <StickyCursor stickyElement={stickyElement} /> */}
            <Contact />

        </nav>
        <main className="flex justify-end items-center h-screen w-screen px-20">
          <Image height={500} width={1000} src={"/DevilGirl.jpg"} alt="image" className="rounded-br-4xl rounded-bl-full rounded-tr-none"/>
        </main>
      </section>
      <section>
        <Projects />
      </section>
      <section>
        <TechStack />
      </section>
    </div>
  );
};

export default Page;
