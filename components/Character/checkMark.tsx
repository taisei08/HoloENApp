import React from "react";

interface CheckMarkProps {
  visible: boolean;
}

const CheckMark: React.FC<CheckMarkProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export default CheckMark;
