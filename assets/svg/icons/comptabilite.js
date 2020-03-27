import React from 'react';
import { Svg, Path, Rect, Circle } from 'react-native-svg';

function ComptabiliteIcon({ height, width, color }) {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
    >
      <Rect width="18" height="18" rx="3" fill={color} />
      <Rect
        x="4.909"
        y="2.455"
        width="13.091"
        height="13.091"
        rx="2"
        fill="#fff"
      />
      <Path
        d="M4.91 4.455a2 2 0 0 1 2-2H18v13.09H6.91a2 2 0 0 1-2-2v-9.09z"
        fill="#fff"
      />
      <Path
        d="M7.363 6.91a2 2 0 0 1 2-2H18v8.181H9.363a2 2 0 0 1-2-2V6.909z"
        fill={color}
      />
      <Circle cx="10.636" cy="9" r="1.636" fill="#fff" />
    </Svg>
  );
}

export default ComptabiliteIcon;
