import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../ui/tech-stack";

export function TechStack() {
  const items = [
    {
      title: "React JS",
      image: "/react.png",
      className:
        "absolute top-[10vh] left-[10%] sm:top-10 sm:left-[20%] rotate-[-5deg]",
    },
    {
      title: "NextJS",
      image: "/Next.png",
      className:
        "absolute top-[25vh] left-[15%] sm:top-40 sm:left-[25%] rotate-[-7deg]",
    },
    {
      title: "MongoDB",
      image: "/mongodb.png",
      className:
        "absolute top-[5vh] left-[50%] sm:top-0 sm:left-[40%] rotate-[8deg]",
    },
    {
      title: "Express",
      image: "/express.png",
      className:
        "absolute top-[35vh] left-[55%] sm:top-56 sm:left-[53%] rotate-[10deg]",
    },
    {
      title: "Vite",
      image: "/vite.png",
      className:
        "absolute top-[15vh] right-[25%] sm:top-20 sm:right-[35%] rotate-[2deg]",
    },
    {
      title: "HTML",
      image: "/html.png",
      className:
        "absolute top-[30vh] left-[20%] sm:top-32 sm:left-[45%] rotate-[-7deg]",
    },
    {
      title: "CSS",
      image: "/css.png",
      className:
        "absolute top-[8vh] left-[30%] sm:top-8 sm:left-[30%] rotate-[4deg]",
    },
    {
      title: "JavaScript",
      image: "/js.png",
      className:
        "absolute top-[40vh] left-[30%] sm:top-40 sm:left-[35%] rotate-[4deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        TechStack I Know
      </p>

      <div className="w-full h-full absolute top-[20vh] left-0 sm:left-[5vw] px-4">
        {items.map((item) => (
          <DraggableCardBody className={item.className} key={item.title}>
            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none relative z-10 h-auto w-24 sm:w-32 md:w-40 object-contain"
            />
            <h3 className="mt-4 text-center text-base sm:text-lg md:text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              {item.title}
            </h3>
          </DraggableCardBody>
        ))}
      </div>
    </DraggableCardContainer>
  );
}
