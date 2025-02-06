export default function GamePage() {
  return (
    <div className="w-full h-screen text-background flex items-center flex-col gap-12 justify-center bg-foreground">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl  font-bold text-center">Game Page</h1>
      </div>
      <div className="w-[800px] h-[800px] border border-blue-100">
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full border border-white">
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
          <div className="border border-white"></div>
        </div>
      </div>
    </div>
  );
}
