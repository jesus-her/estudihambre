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

import { BiDollar, BiQr } from "react-icons/bi";
import QRModal from "@/app/components/modals/QRModal";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  User,
  Button,
  Modal,
  useDisclosure,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [link, setLink] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  const generateQRCode = () => {
    // toggleModal();
    onOpen();
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
      <Card className=" mb-4">
        <div className="flex flex-col md:flex-row items-center">
          <CardHeader className="w-fit">
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
          </CardHeader>
          <CardBody className="w-full">
            <div className="  z-[1] m-4 p-4  gap-4 flex flex-col rounded-lg border border-[#f0f0f0] dark:border-[#2c2c2c] ">
              {/* Owner */}
              <p className=" text-sm font-semibold opacity-60">Vendido por:</p>
              <User
                name={listing.user.name}
                className=" self-start"
                description={`WhatsApp: ${listing.guestCount}, ${listing.locationValue}`}
                avatarProps={{
                  //@ts-ignore
                  src: listing.user.image,
                }}
              />
              {/* <p className=" text-sm font-semibold opacity-60">Ubicado en:</p> */}

              <Chip
                size="sm"
                variant="flat"
                color="secondary"
                className=" uppercase"
              >
                Edificio: {listing.locationValue}
              </Chip>

              <hr />

              <div className=" flex flex-row justify-between gap-10 ">
                <div className=" flex flex-col gap-2 ">
                  <p className=" font-semibold text-neutral-400 text-xs md:text-xs uppercase ">
                    {formattedDate}
                  </p>
                  <h1 className=" text-3xl font-bold">{listing.title}</h1>
                  <p className=" font-semibold text-neutral-500 text-sm md:text-base">
                    {listing.description}
                  </p>
                </div>
              </div>
              <hr />

              <div className=" w-full flex justify-between">
                <Chip
                  startContent={<BiDollar />}
                  variant="flat"
                  color="success"
                  className=" font-bold tracking-wider"
                >
                  {listing.price} c/u
                </Chip>
                <Button
                  startContent={<BiQr />}
                  size="sm"
                  radius="full"
                  onClick={generateQRCode}
                >
                  Compartir
                </Button>
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
      <div
        className="
        max-w-screen-lg 
        mx-auto
        "
      >
        <QRModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          qrCodeValue={qrCodeValue}
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:gap-2 mt-0">
            <div className="mt-0 md:mt-0">
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
                    radius="full"
                    color="primary"
                    onClick={() => {
                      router.push("/properties");
                    }}
                  >
                    Mis productos
                  </Button>
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
