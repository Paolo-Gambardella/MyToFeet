import React from "react";
import { Svg, Rect } from "react-native-svg";

function MenuIcon({ height, width, color }) {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      x="0px"
      y="0px"
      viewBox="0 0 21 15"
    >
      <Rect x="5.444" width="15.556" height="3" rx="1.5" fill={color} />
      <Rect x="3.111" y="12" width="17.889" height="3" rx="1.5" fill={color} />
      <Rect y="6" width="21" height="3" rx="1.5" fill={color} />
    </Svg>
  );
}

export default MenuIcon;
