"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import { BiAdjust } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import Filter1GrainTexture from "../filters/Filter1GrainTexture";
import Filter3Colors from "../filters/Filter3Colors";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  disabledCard?: boolean;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  disabledCard,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => (disabledCard ? {} : router.push(`/listings/${data.id}`))}
      className=" cursor-pointer   rounded-xl py-4 px-3 shadow-xs border-2 border-neutral-100 bg-white relative "
    >
      {/* <Filter1GrainTexture />
      <Filter3Colors /> */}
      <div className="flex flex-row md:flex-col gap-2 w-full  h-full ">
        <div
          className=" 
            aspect-square
            w-1/2 md:w-full
            relative 
            overflow-hidden 
            rounded-2xl 
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition 
            "
            src={data.imageSrc}
            alt="Listing"
          />
          {currentUser?.id !== data.userId && (
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )}
        </div>
        <div className=" justify-between  flex flex-col flex-1 gap-4  ">
          <div>
            <div className="font-bold text-xl">{data.title}</div>
            <div className="font-light text-neutral-500 ">
              Edificio <span className="uppercase ">{data.locationValue}</span>
            </div>

            {/* <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div> */}
          </div>
          <div className=" cursor-pointer justify-between flex flex-row items-center">
            <div className="flex flex-row items-center gap-1 font-bold text-black text-base bg-gray-100 px-3 py-1 rounded-full">
              <div>${price}</div>
              {/* {!reservation && <div className="font-light">c/u</div>} */}
            </div>
            <div className=" text-gray-400 ">
              <MdNavigateNext size={25} />
            </div>
          </div>

          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
