"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { usePathname, useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingReservation from "@/app/components/listings/ListingReservation";
import Avatar from "../../components/Avatar";
import Button from "@/app/components/Button";
import Image from "next/image";

import { BiQr } from "react-icons/bi";
import QRModal from "@/app/components/modals/QRModal";
import Filter2DiagonalLines from "@/app/components/filters/Filter2DiagonalLines";
import Filter3Colors from "@/app/components/filters/Filter3Colors";
import Filter1GrainTexture from "@/app/components/filters/Filter1GrainTexture";

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

  // const Icon: IconType = category?.icon;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [link, setLink] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  const generateQRCode = () => {
    toggleModal();
    setQRCodeValue(`https://estudihambre.vercel.app${pathname}`);
  };

  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };
  // useEffect(() => {
  //   handleLinkChange(pathname);
  // }, []);

  console.log(listing);

  const listingDate = new Date(listing.createdAt);

  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];

  const formattedDate = `${
    months[listingDate.getMonth()]
  } ${listingDate.getDate()} ${listingDate.getFullYear()}`;

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <div className=" flex flex-col relative w-full h-full overflow-hidden   shadow-md  gap-4 rounded-lg ">
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
              src={listing.imageSrc}
              alt="Listing"
            />
            <div className=" bg-white z-[1] m-4 p-4  gap-4 flex flex-col rounded-lg ">
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
              {/* Owner */}
              <div className="flex flex-row gap-2 items-center  bg-white mt-2  ">
                <Avatar src={listing.user.image}></Avatar>
                <div className=" text-sm opacity-70">
                  Vendido por: {listing.user.name}
                  <div className=" text-xs ">
                    WhatsApp: {listing.guestCount}
                  </div>
                </div>
              </div>
              <hr />
              <div className=" flex flex-row justify-between   gap-10 bg-white">
                <div className=" flex flex-col gap-2 ">
                  <p className=" font-semibold text-gray-400 text-xs md:text-xs uppercase ">
                    {formattedDate}
                  </p>
                  <h1 className=" text-3xl font-bold">{listing.title}</h1>
                  <p className=" font-semibold text-gray-500 text-sm md:text-base">
                    {listing.description}
                  </p>
                </div>
                {/* <div
                  onClick={generateQRCode}
                  className=" text-black font-bold  hover:opacity-80 gap-1     flex flex-col justify-center items-center  cursor-pointer"
                >
                  <p className=" font-semibold text-gray-500 text-xs md:text-base text-center mb-2">
                    {formattedDate.toUpperCase()}
                  </p>
                  <BiQr
                    size={38}
                    className="rounded-full bg-black p-2 shadow-2xl text-white"
                  />
                  <p className=" text-xs font-bold">¡Compartir!</p>
                </div> */}
              </div>
              <hr />
              <div className="flex flex-row items-center gap-1  relative    justify-between ">
                <div className="text-3xl font-semibold    px-3 py-1 rounded-full flex flex-col items-center justify-center bg-gray-100 ">
                  {/* <p className=" font-semibold text-gray-400 text-xs md:text-base text-center mb-2">
                    {formattedDate}
                  </p> */}
                  <p>${listing.price}</p>
                </div>

                <div
                  onClick={generateQRCode}
                  className=" text-black bg-black rounded-full pr-4 font-bold  hover:opacity-80 gap-1 flex  justify-center items-center  cursor-pointer"
                >
                  <BiQr
                    size={38}
                    className="rounded-full bg-black p-2 shadow-2xl text-white"
                  />
                  <p className=" text-xs font-bold text-white">¡Compartir!</p>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <QRModal toggleModal={toggleModal} qrCodeValue={qrCodeValue} />
            )}
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
