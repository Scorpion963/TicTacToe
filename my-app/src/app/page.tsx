import ButtonContainer from "./components/Button";
import HomeHeader from "./components/PageHeader";


export default async function Home() {
  const buttons = [
    { label: "Play", href: "/enemy-selection" },
    { label: "Add Friends", href: "/friends" },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-foreground">
      <div className="flex flex-col gap-12">
        <HomeHeader>Tic Tac Toe</HomeHeader>
        <ButtonContainer buttons={buttons} />
      </div>
    </div>
  );
}
