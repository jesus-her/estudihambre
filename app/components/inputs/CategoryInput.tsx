"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={` cursor-pointer 
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
      

        transition 
      
        ${
          selected
            ? "  bg-gradient-to-r from-[#E66310]  to-primary  text-white hover:opacity-100"
            : "border-neutral-200 hover:opacity-70"
        }
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
