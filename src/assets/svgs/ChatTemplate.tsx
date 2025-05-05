import React from "react";

const ChatTemplate = ({ fillColor }: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2Z"
        stroke={fillColor ? fillColor : "#4B5A5A"}
        strokeWidth="2"
      />
      <path
        d="M2 10H22"
        stroke={fillColor ? fillColor : "#4B5A5A"}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M9 10V22"
        stroke={fillColor ? fillColor : "#4B5A5A"}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatTemplate;
