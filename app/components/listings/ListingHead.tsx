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
      <div className="relative w-full h-full">
        {/* <Image
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
        /> */}
        {/* <Filter1GrainTexture /> */}
        <div className=" h-96 w-full relative">
          <Image
            fill
            className="
          object-cover md:object-contain border border-b-0 md:border-b border-gray-200
          h-full 
          w-full 
          
          transition
          
          "
            src={imageSrc}
            alt="Listing"
          />
          {category && Icon && (
            <div
              className=" flex flex-row bg-black px-2 py-1 rounded-full text-white  text-xs w-fit items-center gap-2
           absolute  right-0 -bottom-3 left-1/2 justify-center transform -translate-x-1/2 z-[1] border-2 border-white"
            >
              <Icon size={18} />
              <span>{category}</span>
            </div>
          )}
        </div>
        {listing.userId !== currentUser?.id && (
          <div
            className="
        absolute
        top-2
        right-2
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
