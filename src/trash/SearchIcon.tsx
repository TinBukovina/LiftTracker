import React from "react";

interface SearchIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  width = "24px",
  height = "24px",
  fill = "#000",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path
        d="M13.46,24.45 C7.17,24.45 2.071,19.44 2.071,13.25 C2.071,7.06 7.17,2.04 13.46,2.04 C19.75,2.04 24.85,7.06 24.85,13.25 C24.85,19.44 19.75,24.45 13.46,24.45 L13.46,24.45 Z M31.688,30.25 L23.429,22.12 C25.591,19.77 26.92,16.67 26.92,13.25 C26.92,5.93 20.894,0 13.46,0 C6.026,0 0,5.93 0,13.25 C0,20.56 6.026,26.49 13.46,26.49 C16.672,26.49 19.618,25.38 21.932,23.53 L30.224,31.69 C30.629,32.09 31.284,32.09 31.688,31.69 C32.093,31.3 32.093,30.65 31.688,30.25 L31.688,30.25 Z"
        fill="inherit"
      />
    </svg>
  );
};

export default SearchIcon;
