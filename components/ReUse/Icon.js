import React from "react";
import Svg, { Path } from "react-native-svg";
import icons from "../../icons.json";

export default function Icon({ 
  name, 
  size = 24, 
  color = "black", 
  filled = true 
}) {
  const d = icons[name];
  if (!d) return null;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path
        d={d}
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeWidth={filled ? 0 : 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
