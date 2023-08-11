"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: any;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={` text-sm items-center justify-center text-center flex flex-col cursor-pointer ${
        active ? " text-primary" : " text-gray-500"
      } `}
    >
      {icon && (
        <div className={`rounded-full p-1 items-center justify-center flex `}>
          {icon}
        </div>
      )}
      {label}
    </div>
  );
};

export default MenuItem;
