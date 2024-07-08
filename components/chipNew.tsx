import { Chip } from "@nextui-org/react";
import React from "react";

export const ChipNew = () => {
  return (
    <Chip
      variant="shadow"
      classNames={{
        base: "absolute top-1 right-2 bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 z-20",
        content: "drop-shadow shadow-black text-white",
      }}
    >
      Novidade
    </Chip>
  );
};
