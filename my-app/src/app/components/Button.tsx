import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function ButtonContainer({
  buttons,
}: {
  buttons: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-white">
      {buttons.map(({ label, href }) => (
        <Button
          asChild
          size="lg"
          className=" hover:bg-primary/70 w-full h-16"
          key={href}
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
      <SignedOut>
        <Button asChild className="w-full h-16">
          <SignInButton />
        </Button>
        <Button asChild className="w-full h-16">
          <SignUpButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <Button asChild className="w-full h-16">
          <SignOutButton />
        </Button>
      </SignedIn>
    </div>
  );
}
