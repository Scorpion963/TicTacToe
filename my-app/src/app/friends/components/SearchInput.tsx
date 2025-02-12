"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchInput({
  placeholder,
  search,
}: {
  placeholder: string;
  search: string;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [query] = useDebounce(value, 750);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push("/friends");
    } else {
      router.push(`/friends?name=${query}`);
    }
  }, [query]);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button>Search</Button>
    </div>
  );
}
