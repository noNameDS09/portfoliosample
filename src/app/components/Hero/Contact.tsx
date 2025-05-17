"use client";

import React, { forwardRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Special_Elite } from "next/font/google";
import Magnetic from "../CustomCursor/StickyCursor/Magnetic";

const special_elite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
});

interface ContactProps {
  // Add any props you might need in the future
  x:string
}

interface ContactItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const CONTACTS: ContactItem[] = [
  {
    href: "https://www.linkedin.com/in/shreyash-daware-3ba6672bb",
    label: "LinkedIn Profile",
    icon: <FaLinkedin />,
    color: "hover:text-blue-700",
  },
];

const EMAIL = process.env.EMAIL!;

const Contact = forwardRef<HTMLButtonElement, ContactProps>((props, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy email:", err));
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 md:top-10 md:right-0 md:left-auto md:transform-none flex flex-row gap-8 items-center justify-center z-50 backdrop-blur-[4px] rounded-2xl px-10 py-4">
      {CONTACTS.map(({ href, label, icon, color }, idx) => (
        <a
          key={`contact-${idx}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`text-gray-600 ${color} transition-colors duration-200 text-2xl`}
        >
          {icon}
        </a>
      ))}
      
      <Magnetic>
        <button
          ref={ref}
          onClick={handleCopyEmail}
          aria-label="Copy email to clipboard"
          className="relative text-gray-500 hover:text-red-400 transition-colors duration-200 text-2xl"
        >
          <SiGmail />
          {copied && (
            <span
              className={`absolute bottom-full -mb-20 left-1/2 -translate-x-1/2 text-sm bg-gray-800 text-gray-100 px-3 py-1 rounded shadow-md ${special_elite.className}`}
            >
              Email copied!
            </span>
          )}
        </button>
      </Magnetic>
    </div>
  );
});

Contact.displayName = "Contact"; // This helps with debugging

export default Contact;