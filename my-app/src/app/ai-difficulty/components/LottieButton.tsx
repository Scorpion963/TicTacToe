"use client"
import { Button } from "@/components/ui/button";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import Lottie from "./Lottie";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LottieButton({
    link,
    buttonColor,
    text,
  }: {
    link: string;
    buttonColor: string;
    text: string;
  }) {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    return (
      <Button
        onMouseEnter={() => {
          setIsVisible(true);
          dotLottie?.play();
        }}
        onMouseLeave={() => {
          setIsVisible(false);
          dotLottie?.pause();
        }}
        asChild
        className={`w-80 h-48 hover:${buttonColor} text-lg`}
      >
        <Link href="/game">
          {!isVisible && (
            <motion.div className="flex gap-2 items-center justify-center pl-16">
              <div className="">{text}</div>
              <div className="h-3/5 flex justify-end items-center">
                <DotLottieReact
                  dotLottieRefCallback={setDotLottie}
                  src={link}
                  loop
                  className=""
                />
              </div>
            </motion.div>
          )}
  
          {isVisible && <Lottie link={link} />}
        </Link>
      </Button>
    );
  }