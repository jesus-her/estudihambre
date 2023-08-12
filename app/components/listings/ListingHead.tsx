"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Filter1GrainTexture from "../filters/Filter1GrainTexture";
import { IconType } from "react-icons";

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
      <div
        className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
      >
        {category && Icon && (
          <div
            className=" flex flex-row bg-black px-2 py-1 rounded-full text-white  text-xs w-fit items-center gap-2
           absolute  right-0 bottom-3 left-1/2 justify-center transform -translate-x-1/2 z-[1] border border-white"
          >
            <Icon size={18} />
            <span>{category}</span>
          </div>
        )}
        <Image
          fill
          className="
        object-contain 
        h-full 
        w-full 
        group-hover:scale-110 
        transition
        c-lesPJm-ikzLvCr-css
        "
          src={imageSrc}
          alt="Listing"
        />
        <Filter1GrainTexture />
        <Image
          fill
          className="
        object-contain 
              h-96 
              w-96 
              
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

        {/* <Heading title={title} subtitle={locationValue} uppercase /> */}
      </div>
    </>
  );
};

export default ListingHead;
