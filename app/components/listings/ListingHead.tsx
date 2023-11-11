"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import { IconType } from "react-icons";
import { Chip, Image } from "@nextui-org/react";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  listing?: any;
  icon?: IconType;
  category?: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  listing,
  icon: Icon,
  category,
}) => {
  const { getByValue } = useCountries();

  return (
    <>
      <div className="relative flex flex-col items-center  rounded-lg">
        <Image
          isBlurred
          className="
          object-cover md:object-cover w-full rounded-lg h-96 lg:h-[28rem] "
          src={imageSrc}
          alt="Listing"
        />
        {category && Icon && (
          <div
            className="w-fit items-center absolute right-0 -bottom-3 left-1/2
             justify-center transform -translate-x-1/2 z-[10]"
          >
            <Chip
              startContent={<Icon size={20} />}
              size="md"
              variant="shadow"
              color="warning"
            >
              {category}
            </Chip>
          </div>
        )}
      </div>
      {listing.userId !== currentUser?.id && (
        <div
          className="
        absolute
        top-2
        right-2 z-[10]
        "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      )}
    </>
  );
};

export default ListingHead;
