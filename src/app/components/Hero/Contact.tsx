"use client";

import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Special_Elite } from "next/font/google";

const special_elite = Special_Elite({
    weight: "400",
    subsets: ["latin"],
});

const CONTACTS = [
    {
        href: "https://github.com/noNameDS09",
        label: "GitHub Profile",
        icon: <FaGithub />,
        color: "hover:text-white",
    },
    {
        href: "https://www.linkedin.com/in/shreyash-daware-3ba6672bb",
        label: "LinkedIn Profile",
        icon: <FaLinkedin />,
        color: "hover:text-blue-700",
    },
];

const EMAIL = "daware.shreyash@gmail.com";

const Contact = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-start justify-center py-8 gap-x-10 md:pr-10">
            {CONTACTS.map(({ href, label, icon, color }, idx) => (
                <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`text-gray-600 ${color} transition-colors duration-200 text-2xl`}
                >
                    {icon}
                </a>
            ))}
            <button
                onClick={handleCopyEmail}
                aria-label="Copy email to clipboard"
                className="relative text-gray-700 hover:text-red-400 transition-colors duration-200 text-2xl"
            >
                <SiGmail />
                {copied && (
                    <span
                        className={`absolute -top-6 left-1/2 -translate-y-7 md:translate-y-14 -translate-x-8 text-sm bg-gray-800 text-gray-200 px-2 py-1 rounded shadow-md ${special_elite.className}`}
                    >
                        Email copied!
                    </span>
                )}
            </button>
        </div>
    );
};

export default Contact;
