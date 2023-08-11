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
        flex-row 
        items-center 
        justify-center 
        gap-0  rounded-full px-3
        ${selected ? "bg-black" : "bg-white"}
        ${selected ? "text-white" : "text-neutral-500"}
        ${selected ? "hover:opacity-100" : "hover:opacity-80"}
 
        transition 
        cursor-pointer`}
    >
      <div className={` p-2 rounded-full`}>
        <Icon size={22} />
      </div>
      <div className={` text-sm `}>{label}</div>
    </div>
  );
};

export default CategoryBox;
