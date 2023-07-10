"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
  listing?: any;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  listing,
}) => {
  const { getByValue } = useCountries();

  return (
    <>
      <div
        className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl bg-[#f0f0f0] shadow-md
          "
      >
        <Image
          fill
          className="
              object-contain 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
          src={imageSrc}
          alt="Listing"
        />
        {listing.userId !== currentUser?.id && (
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        )}
      </div>
      {/* <Heading title={title} subtitle={locationValue} uppercase /> */}
    </>
  );
};

export default ListingHead;
