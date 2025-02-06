import { Button } from "@/components/ui/button";

export default function GamePage() {
  return (
    <div className="w-full h-screen text-background flex items-center flex-col gap-12 justify-center bg-foreground">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl  font-bold text-center">Game Page</h1>
      </div>
      <div className="w-[800px] h-[800px] border border-blue-100 border-opacity-10">
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => <Button className="w-full h-full rounded-none text-4xl" key={i}></Button>)}
        </div>
      </div>
    </div>
  );
}
