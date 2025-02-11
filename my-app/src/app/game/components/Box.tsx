import { Button } from "@/components/ui/button";

export default function Box({
    handleClick,
    allowedToBeClicked,
    i,
    isChecked,
  }: {
    handleClick: (value: number) => void;
    allowedToBeClicked: (value: number) => boolean;
    i: number;
    isChecked: (i: number) => "X" | "O" | "";
  }) {
    return (
      <Button
        onClick={() => handleClick(i)}
        disabled={allowedToBeClicked(i)}
        value={i}
        className="w-full h-full rounded-none text-2xl"
      >
        {isChecked(i)}
      </Button>
    );
  }
  