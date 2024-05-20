import { useState } from "react";
import { Button } from "../Button";

interface TimeOptionsProps {
  interval: string;
  setInteval: React.Dispatch<string>;
}

export default function TimeOptions({
  interval,
  setInteval,
}: TimeOptionsProps) {
  return (
    <div className="buttons w-[90%] grid grid-cols-5 gap-4 m-4">
      <Button.Root
        active={interval === "1week" ? true : false}
        className="bg-zinc-800 rounded-df px-2 py-1 duration-300"
        onClick={() => setInteval("1week")}
      >
        <Button.Content
          active={interval === "1week" ? true : false}
          text="1 Semana"
          className="break-keep"
        />
      </Button.Root>

      <Button.Root
        active={interval === "1month" ? true : false}
        className="bg-zinc-800 rounded-df px-2 py-1 duration-300"
        onClick={() => setInteval("1month")}
      >
        <Button.Content
          active={interval === "1month" ? true : false}
          text="1 Mês"
          className="break-keep"
        />
      </Button.Root>

      <Button.Root
        active={interval === "3month" ? true : false}
        className="bg-zinc-800 rounded-df px-2 py-1 duration-300"
        onClick={() => setInteval("3month")}
      >
        <Button.Content
          active={interval === "3month" ? true : false}
          text="3 Mês"
          className="break-keep"
        />
      </Button.Root>

      <Button.Root
        active={interval === "6month" ? true : false}
        className="bg-zinc-800 rounded-df px-2 py-1 duration-300"
        onClick={() => setInteval("6month")}
      >
        <Button.Content
          active={interval === "6month" ? true : false}
          text="6 Mês"
          className="break-keep"
        />
      </Button.Root>

      <Button.Root
        active={interval === "1year" ? true : false}
        className="bg-zinc-800 rounded-df px-2 py-1 duration-300"
        onClick={() => setInteval("1year")}
      >
        <Button.Content
          active={interval === "1year" ? true : false}
          text="1 Ano"
          className="break-keep"
        />
      </Button.Root>
    </div>
  );
}
