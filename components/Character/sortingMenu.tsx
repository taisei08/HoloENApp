import React, { useState } from "react";
import CheckMark from "./checkMark";

interface SortingMenuProps {
  handleSort: (criteria: string) => void;
}

const SortingMenu: React.FC<SortingMenuProps> = ({ handleSort }) => {
  const [selected, setSelected] = useState<string>("new");

  const handleClick = (criteria: string) => {
    setSelected(criteria);
    handleSort(criteria);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => handleClick("new")}>
            <CheckMark visible={selected === "new"} />
            新しい順
          </a>
        </li>
        <li>
          <a onClick={() => handleClick("old")}>
            <CheckMark visible={selected === "old"} />
            古い順
          </a>
        </li>
        <li>
          <a onClick={() => handleClick("highWPM")}>
            <CheckMark visible={selected === "highWPM"} />
            WPMが高い順
          </a>
        </li>
        <li>
          <a onClick={() => handleClick("lowWPM")}>
            <CheckMark visible={selected === "lowWPM"} />
            WPMが低い順
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortingMenu;

