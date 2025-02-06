"use client"
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Lottie({ link }: { link: string }) {
    const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

    return (
      <motion.div
        onMouseMove={() => {
          dotLottie?.play();
        }}
        onMouseLeave={() => {
          dotLottie?.pause();
        }}
        className="flex gap-2 items-center justify-center"
      >
        <DotLottieReact
          dotLottieRefCallback={setDotLottie}
          src={link}
          loop
          className=""
        />
      </motion.div>
    );
  }
  