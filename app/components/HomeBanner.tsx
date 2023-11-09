"use client";
import { SafeUser } from "@/app/types";

import { Shrikhand } from "next/font/google";
import useLoginModal from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback } from "react";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

interface NavbarProps {
  currentUser?: SafeUser | null;
  totalProducts: number;
}

const font = Shrikhand({
  weight: "400",
  subsets: ["latin"],
});

const HomeBanner: React.FC<NavbarProps> = ({ currentUser, totalProducts }) => {
  const loginModal = useLoginModal();

  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);
  return (
    <Card
      isFooterBlurred
      className="w-full lg:h-[350px] h-80 col-span-12 sm:col-span-7 justify-center items-center"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start ">
        {/* <p className="text-tiny text-white/60 uppercase font-bold">
          Estudia sin hambre
        </p> */}
        <h4 className={` font-bold text-xl lg:text-3xl max-w-xs lg:max-w-md `}>
          <span className={` tracking-wider`}>Compra & Vende </span>
          comida a los estudiantes.
        </h4>
      </CardHeader>
      <Image
        // removeWrapper
        isBlurred
        alt="Relaxing app background"
        className="z-0 max-w-xs lg:max-w-lg   object-contain "
        src="https://i.imgur.com/jvJJoD8.png"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 object-cover bg-black"
            src="https://i.imgur.com/tS9l610.jpg"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60 capitalize font-bold">
              Estudia sin hambre
            </p>
            {/* <p className="text-tiny text-white/60">Breathing App</p> */}
            <p className="text-tiny text-white/60">¡Comienza a vender ahora!</p>
          </div>
        </div>
        <Button
          onClick={onRent}
          radius="full"
          size="sm"
          color="warning"
          className=" font-bold"
        >
          ¡Publica algo!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeBanner;
