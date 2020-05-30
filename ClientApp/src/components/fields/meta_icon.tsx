import React from "react";

interface MetaIconProps {
  text: string;
  size: string;
  color: string;
}

const MetaIcon = ({ text, size, color }: MetaIconProps) => {
  const width = size === "sm" ? 30 : 60;
  const height = width;

  const style = {
    color: color === "primary" || color === "secondary" ? "white" : "black",
    backgroundColor: color === "primary" ? "#007bff" : "#6c757d",
    width: width,
    height: height,
  };

  return (
    <div className="MetaIcon" style={style}>
      {text}
    </div>
  );
};

export default MetaIcon;
