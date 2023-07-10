"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: any;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-3 
        py-3 
        hover:bg-neutral-300
        transition 
        font-semibold flex flex-row items-center gap-1
      "
    >
      {icon && icon}
      {label}
    </div>
  );
};

export default MenuItem;
