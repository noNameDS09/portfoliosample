"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { Aboreto, Playfair_Display } from "next/font/google";

const aboreto = Aboreto({
    weight: "400",
    subsets: ["latin"],
});
const playfair_display = Playfair_Display({
    weight: "400",
    subsets: ["latin"],
});

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

const quotesData = [
    "Imagination is power",
    "Code is story",
    "Every pixel has a purpose",
    "Every great interface starts with a single line of code.",
    "Code is where logic meets imagination.",
    "Creativity doesn't wait for the perfect brief — just like JavaScript doesn't wait for types.",
    "Debugging is the art of understanding the problem you created.",
    "Craft experiences, not just components.",
    "Time is your canvas — animate wisely.",
    "The best animations feel alive, not choreographed.",
    "Transitions aren't delays — they're conversations.",
];

const scrambleChars = "upperAndLowerCase";
const message = "You dream it, We build it";

export default function Three() {
    const targetRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const [isDecoded, setIsDecoded] = useState<boolean>(false);

    const getRandomPosition = () => {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 200);
        return { x, y };
    };

    const scrambleQuote = (quote: HTMLDivElement, text: string) => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        tl.call(() => {
            const { x, y } = getRandomPosition();
            gsap.set(quote, { x, y });
        })
            .to(quote, {
                delay: Math.random() * 5,
                duration: 1,
                opacity: 1,
                scrambleText: {
                    text,
                    chars: scrambleChars,
                    revealDelay: 0.1,
                    speed: 1,
                },
                ease: "power2.out",
            })
            .to(quote, {
                delay: 2,
                duration: 1,
                scrambleText: { text: "", chars: scrambleChars },
                opacity: 0,
                ease: "power2.in",
            });
    };

    useEffect(() => {
        const quoteElements =
            document.querySelectorAll<HTMLDivElement>(".quote");

        quoteElements.forEach((el) => {
            gsap.set(el, {
                position: "absolute",
                opacity: 0,
                whiteSpace: "nowrap",
            });
            scrambleQuote(el, el.textContent || "");
        });
    }, []);

    useEffect(() => {
        if (targetRef.current) {
            gsap.set(targetRef.current, {
                scrambleText: {
                    text: "*&@#$#@#$@*&$(@#^) ",
                    chars: scrambleChars,
                    speed: 1,
                },
            });
        }
    }, []);

    const toggleScramble = () => {
        const text = isDecoded ? "*&@#$#@#$@*&$(@#^)" : message;
        const duration = isDecoded ? 1 : 1.5;
        const speed = isDecoded ? 0.3 : 1;

        if (targetRef.current) {
            gsap.to(targetRef.current, {
                duration,
                scrambleText: {
                    text,
                    chars: scrambleChars,
                    revealDelay: isDecoded ? 0 : 0.5,
                    speed,
                },
            });
        }

        setIsDecoded((prev) => !prev);
    };

    useEffect(() => {
        if (h1Ref.current) {
            const split = SplitText.create(h1Ref.current, {
                type: "words, lines",
            });
            gsap.from(split.words, {
                x: "random([-1000, 1000])",
                y: "random([-1000, 1000])",
                opacity: 0,
                ease: "expo.inOut",
                duration: 1.25,
            });
        }
    }, []);

    return (
        <section className="relative w-screen h-screen overflow-hidden text-xs font-semibold bg-[#0e0e0e] text-white/30">
            <div
                className={`${aboreto.className} absolute top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-5 px-4`}
            >
                <h1
                    ref={h1Ref}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-100 text-center mb-8 w-full max-w-3xl"
                >
                    Decode Your Vision
                </h1>

                <div
                    className="relative w-60 sm:w-64 bg-white text-black border border-black shadow-lg shadow-white/30 hover:shadow-white/50 py-5 px-4 rounded-[2rem] overflow-hidden text-sm scale-100 sm:scale-110 hover:scale-105 md:hover:scale-[1.15] transition-transform duration-200"
                >
                    <span
                        ref={targetRef}
                        className={`select-none ${playfair_display.className}`}
                    >
                        *&@#$#@#$@*&$(@#^)
                    </span>
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={toggleScramble}
                        className="absolute top-1/2 -translate-y-1/2 right-0 border border-zinc-600 h-full aspect-square bg-black hover:bg-black/85 duration-100 text-white rounded-full text-xs sm:text-[10px] focus:outline-blue-200 scale-95 cursor-pointer"
                    >
                        {isDecoded ? "Encrypt" : "Decrypt"}
                    </button>
                </div>
            </div>

            {quotesData.map((quote, idx) => (
                <div
                    key={idx}
                    className={`${aboreto.className} quote opacity-0 text-center sm:text-md text-xs h-screen max-w-1/2`}
                >
                    {quote}
                </div>
            ))}
        </section>
    );
}
