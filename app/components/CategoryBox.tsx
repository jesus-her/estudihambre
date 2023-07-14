"use client";
//@ts-ignore
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2

        hover:opacity-80
        transition 
        cursor-pointer

      `}
    >
      <div
        className={` p-2 rounded-full
        ${selected ? "bg-primary" : "bg-gray-100"}
        ${selected ? "text-white" : "text-neutral-500"}`}
      >
        <Icon size={26} />
      </div>
      <div
        className={` font-bold text-sm  
        ${selected ? "text-primary" : "text-neutral-500"}`}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
