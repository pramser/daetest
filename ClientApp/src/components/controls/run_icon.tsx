import React from "react";

import { RunType } from "../../types";

interface RunIconProps {
  type: RunType;
  size: string;
}

const RunIcon = ({ type, size }: RunIconProps) => {
  const name = RunType[type];

  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/${name}.png`}
      height={size === "sm" ? "30" : "60"}
      alt="Test Icon"
    />
  );
};

export default RunIcon;
