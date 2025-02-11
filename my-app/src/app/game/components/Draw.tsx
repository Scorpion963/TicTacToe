import { Button } from "@/components/ui/button";

export default function Draw({ replay }: { replay: () => void }) {
    return (
      <div className="bg-[#08101f] flex flex-col gap-4 h-fit rounded-lg px-12 py-8 text-white text-center">
        <h1 className="font-bold 2xl:text-6xl text-4xl">Draw!</h1>
        <Button
          variant={"destructive"}
          className="text-lg p-6"
          onClick={() => replay()}
        >
          Replay
        </Button>
      </div>
    );
  }