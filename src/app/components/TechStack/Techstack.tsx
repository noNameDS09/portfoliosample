import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../ui/tech-stack";

export function TechStack() {
  const items = [
    {
      title: "React JS",
      image:
        "/react.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "NextJS",
      image:
        "/Next.png",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "MongoDB",
      image:
        "/mongodb.png",
      className: "absolute top-0 left-[40%] rotate-[8deg]",
    },
    {
      title: "Express",
      image:
        "/express.png",
      className: "absolute top-56 left-[53%] rotate-[10deg]",
    },
    {
      title: "Vite",
      image:
        "/vite.png",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "HTML",
      image:
        "/html.png",
      className: "absolute top-32 left-[45%] rotate-[-7deg]",
    },
    {
      title: "CSS",
      image:
        "css.png",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
    {
      title: "JavaScript",
      image:
        "js.png",
      className: "absolute top-40 left-[35%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        TechStack I Know
      </p>
    
    <div className=" w-screen h-screen absolute top-[25vh] left-[5vw]">

      {items.map((item) => (
          <DraggableCardBody className={item.className} key={item.title}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-fit w-40 object-contain"
            />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
      </div>
    </DraggableCardContainer>
  );
}
