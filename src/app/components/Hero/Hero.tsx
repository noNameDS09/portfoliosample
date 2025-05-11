"use client";
import React, { useEffect, useState } from "react";
import { Aboreto } from "next/font/google";

const aboreto = Aboreto({
    weight : "400",
    subsets : ["latin"]
})
export const Hero: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`${aboreto.className} flex items-center justify-center mt-40 md:mt-40 rounded-2xl w-full`}>
      
    </div>
  );
};
