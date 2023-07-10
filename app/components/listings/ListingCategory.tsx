"use client";

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType;
  label: string;
  description: string;
  location: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  description,
  location,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className=" flex-row flex gap-1 items-center justify-start">
            <div className="text-3xl font-bold">{label}</div>
            <Icon size={30} className=" text-primary " />
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
