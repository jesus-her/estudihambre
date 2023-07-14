"use client";

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType;
  label: string;
  description: string;
  location: string;
  category: any;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  description,
  location,
  category,
}) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className=" flex flex-row bg-primary px-2 py-1 rounded-full text-white justify-start text-xs w-fit items-center gap-2">
        <Icon size={18} />
        <span>{category}</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className=" flex-row flex gap-1 items-center justify-start">
            <div className="text-3xl font-bold">{label}</div>
          </div>
          <div className=" font-bold text-sm   text-primary">
            Edificio<span className="uppercase "> {location}</span>
          </div>

          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
