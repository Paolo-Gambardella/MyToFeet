import React from 'react';
import { Svg, Path } from 'react-native-svg';

function PerformancesGrey({ height, width, color }) {
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
        d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM5 14c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"
        fill={color}
      />
    </Svg>
  );
}

export default PerformancesGrey;
