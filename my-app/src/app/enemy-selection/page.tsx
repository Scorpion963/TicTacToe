import { Button } from "@/components/ui/button";
import HomeHeader from "../components/PageHeader";
import Link from "next/link";

export default async function EnemySelectionPage() {

  return (
    <div className="flex items-center justify-center h-screen bg-foreground">
      <div className="flex items-center flex-col gap-12">
        <HomeHeader>Select Your Enemy</HomeHeader>
        <div className="flex items-center gap-2">
          <Button asChild className="w-80 h-48 hover:bg-blue-500 text-lg">
            <Link href="/ai-difficulty">AI</Link>
          </Button>
          <Button asChild className="w-80 h-48 hover:bg-green-500 text-lg">
            <Link href="/friends">Friend</Link>
          </Button>
          <Button asChild className="w-80 h-48 hover:bg-red-500 text-lg">
            <Link href="/game">Yourself</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
