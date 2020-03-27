import React from "react";
import { Svg, Path } from "react-native-svg";

function DocumentsIcon({ height, width, color }) {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
    >
      <Path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M16 0H1.99C.88 0 .01.89.01 2L0 16c0 1.1.88 2 1.99 2H16c1.1 0 2-.9 2-2V2a2 2 0 0 0-2-2zm0 12h-3.13c-.47 0-.85.34-.98.8A3.006 3.006 0 0 1 9 15c-1.37 0-2.54-.93-2.89-2.2-.13-.46-.51-.8-.98-.8H2V3c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v9z"
        fill={color}
      />
    </Svg>
  );
}

export default DocumentsIcon;
