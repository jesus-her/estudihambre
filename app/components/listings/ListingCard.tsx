"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import { BiDollar } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
} from "@nextui-org/react";

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
    <Card
      isPressable
      isFooterBlurred
      onClick={() =>
        disabledCard
          ? {}
          : setTimeout(() => {
              router.push(`/listings/${data.id}`);
            }, 500)
      }
      className=" cursor-pointer   rounded-xl  shadow-xs border border-[#f0f0f0] dark:border-[#2c2c2c]   relative "
    >
      {/* <Filter1GrainTexture />
      <Filter3Colors /> */}
      <CardBody className="flex flex-row md:flex-col gap-2 w-full  h-full ">
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
            removeWrapper
            className="object-cover h-full  w-full"
            src={data.imageSrc}
            alt="Listing"
            isBlurred
          />
          {currentUser?.id !== data.userId && (
            <div
              className="
            absolute
            top-3
            right-3 z-[10]
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
            <Chip size="sm" variant="dot" color="warning">
              {data.category}
            </Chip>

            {/* <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div> */}
          </div>

          {onAction && actionLabel && (
            <Button
              variant="flat"
              radius="full"
              color="danger"
              size="sm"
              onClick={handleCancel}
              disabled={disabled}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardBody>

      <CardFooter className=" cursor-pointer justify-between flex flex-row items-center">
        <Chip
          startContent={<BiDollar />}
          variant="flat"
          color="success"
          className=" font-bold tracking-wider"
        >
          {data.price} c/u
        </Chip>

        <div className=" text-gray-400 ">
          <MdNavigateNext size={25} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
