"use client";
import HomeHeader from "../components/PageHeader";
import LottieButton from "./components/LottieButton";


export default function AiDifficultyPage() {
  const easy =
    "https://lottie.host/aee258de-17e7-49a0-86c5-9aa5915da25c/7YGroFgbny.lottie";
  const medium =
    "https://lottie.host/a9cc36e0-60a5-4ef1-911c-bd41710ea370/hB2lfUzjHW.lottie";
  const hard =
    "https://lottie.host/6099756e-d981-4dd8-8eec-3ccf05f8c38f/3q0t4pwtR9.lottie";
  return (
    <div className="flex items-center justify-center h-screen bg-foreground">
      <div className="flex items-center flex-col gap-12">
        <HomeHeader>Select AI difficulty</HomeHeader>
        <div className="flex items-center gap-2">
          <LottieButton text="Easy" buttonColor="bg-green-500" link={easy} />
          <LottieButton text="Medium" buttonColor="bg-yellow-500" link={medium} />
          <LottieButton text="Hard" buttonColor="bg-red-500" link={hard} />
        </div>
      </div>
    </div>
  );
}



