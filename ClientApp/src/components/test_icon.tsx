import React from "react";

import { TestRunType } from "../types";

interface TestIconProps {
  type: TestRunType;
  size: string;
}

const TestIcon = ({ type, size }: TestIconProps) => {
  const name = TestRunType[type];

  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/${name}.png`}
      height={size === "sm" ? "30" : "60"}
      alt="Test Icon"
    />
  );
};

export default TestIcon;
