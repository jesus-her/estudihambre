"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  title: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries();

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={title}
          description={description}
          location={locationValue}
        />
      )}
      <div className="flex flex-row gap-2 items-center ">
        <Avatar src={user.image}></Avatar>
        <div className=" text-sm opacity-70">
          Vendido por: {user.name}
          <div className=" text-xs ">WhatsApp: {guestCount}</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ListingInfo;
