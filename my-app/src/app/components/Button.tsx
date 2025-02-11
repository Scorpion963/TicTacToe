import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";


export default async function ButtonContainer({
  buttons,
}: {
  buttons: { label: string; href: string }[];
}) {

 

  return (
    <div className="flex flex-col items-center gap-2">
      {buttons.map(({ label, href }) => (
        <Button
          asChild
          size="lg"
          className=" hover:bg-primary/70 w-full h-16"
          key={href} // Add a unique key for each button
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
      <LogInButton />  <LogOutButton />
    </div>
  );
}
