import React from 'react';

const Logo = ({ className = '', style = {} }) => (
  <svg
    className={className}
    style={style}
    width="120" height="40" viewBox="0 0 120 40" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="bhir.ai logo"
  >
    <text
      x="0"
      y="30"
      fontFamily="Inter, Arial, sans-serif"
      fontWeight="bold"
      fontSize="28"
      fill="#bdbdbd"
    >
      bhīr
      <tspan fill="#ff2222">.</tspan>
      ai
    </text>
  </svg>
);

export default Logo; 