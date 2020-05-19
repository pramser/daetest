import React, { Component } from "react";

import { TestRunType } from "../types/Types";

class TestIcon extends Component<{ type: TestRunType; size: string }, any> {
  render() {
    const { type, size } = this.props;

    return (
      <img
        src={`${process.env.PUBLIC_URL}/images/${type}.png`}
        height={size === "sm" ? "30" : "60"}
        alt="Test Icon"
      />
    );
  }
}

export default TestIcon;
