"use client";

import axios from "axios";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { usePathname, useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import Avatar from "../../components/Avatar";
import Button from "@/app/components/Button";
import { IconType } from "react-icons";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const pathname = usePathname();
  console.log(pathname);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const Icon: IconType = category?.icon;

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <div
            className=" flex flex-col

            w-full
            h-full
            relative 
            overflow-hidden 
            rounded-xl bg-[#fff] shadow-md
             p-4 gap-4
          "
          >
            <div className=" flex flex-col gap-2">
              <h1 className=" text-4xl font-bold">{listing.title}</h1>
              <p className=" font-medium text-gray-500">
                {listing.description}
              </p>
            </div>
            {/* <ListingInfo
              user={listing.user}
              category={category}
              title={listing.title}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            /> */}
            <ListingHead
              category={category?.label}
              icon={category?.icon}
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
            <hr className=" my-0" />
            <div className=" flex flex-row justify-between">
              {/* Owner */}

              <div className="flex flex-row gap-2 items-center ">
                <Avatar src={listing.user.image}></Avatar>
                <div className=" text-sm opacity-70">
                  Vendido por: {listing.user.name}
                  <div className=" text-xs ">
                    WhatsApp: {listing.guestCount}
                  </div>
                </div>
              </div>
              <div className=" text-white p-1 rounded-full bg-black  flex flex-col justify-center items-center ml-2">
                <Icon size={30} />
                {/* <p>{category?.label}</p> */}
              </div>
            </div>
          </div>

          <div
            className="
              flex flex-col
              md:gap-2 
              mt-0
            "
          >
            {/* <ListingInfo
              user={listing.user}
              category={category}
              title={listing.title}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            /> */}
            <div
              className="
                mt-0
                md:mt-0 
       =
              "
            >
              {listing.userId !== currentUser?.id ? (
                <ListingReservation
                  listing={listing}
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              ) : (
                <div className=" flex flex-col items-center justify-center gap-3 ">
                  <div className="font-bold text-center">
                    ¡Este producto es tuyo!{"\n"}
                    <br />
                    <span className=" text-xs opacity-80">
                      Haz click en el botón para volver a ver la lista de tus
                      productos.
                    </span>
                  </div>
                  <Button
                    label={"Mis productos"}
                    onClick={() => {
                      router.push("/properties");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
