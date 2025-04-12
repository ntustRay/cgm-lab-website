import React from 'react';

interface CGMLogoProps {
  size?: number;
  color?: string;
}

const CGMLogo = ({ size = 64, color = 'white' }: CGMLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="20" fill="black" />
      <path
        d="M50 5L87.5 25V75L50 95L12.5 75V25L50 5Z"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default CGMLogo; 