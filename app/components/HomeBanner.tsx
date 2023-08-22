"use client";
import { SafeUser } from "@/app/types";

import { Shrikhand } from "next/font/google";
import Container from "./Container";
import Filter2DiagonalLines from "./filters/Filter2DiagonalLines";
import Filter3Colors from "./filters/Filter3Colors";
import Filter1GrainTexture from "./filters/Filter1GrainTexture";
import Image from "next/image";
import logo from "../../public/images/estudilogo.png";
import { BiCircle, BiPlus, BiSquare } from "react-icons/bi";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useRentModal from "../hooks/useRentModal";
import { useCallback, useState } from "react";
import getListings from "../actions/getListings";

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
    <div className=" flex flex-row gap-0 text-white  font-extrabold justify-center items-center bg-white  shadow-sm  p-0 rounded-lg relative overflow-hidden">
      <div className="relative overflow-hidden rounded-lg bg-cover md:bg-contain  text-center banner w-full  ">
        <Filter1GrainTexture />
        <Filter3Colors />

        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed   ">
          <div className="flex flex-col h-full items-center justify-center p-4 ">
            <div className="text-white  flex flex-col drop-shadow-lg shadow-blue-700">
              <span className=" text-xl md:text-2xl text-white  relative  ">
                Estudia sin hambre
              </span>
              <span
                className={`${font.className} text-4xl md:text-6xl tracking-wide  text-white text-center relative`}
              >
                compra & vende
              </span>
              <span className=" text-lg md:text-xl  tracking-wide text-white  relative  ">
                comida a los estudiantes
              </span>
              <button
                onClick={onRent}
                type="button"
                className="  bg-gradient-to-b from-[#2c2c2c] to-[#000] py-1 w-fit px-8 self-center  mt-4 font-bold rounded-full  text-base  hover:bg-opacity-90 relative"
              >
                ¡Publica algo!
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white flex flex-1 w-full  absolute bottom-2 left-1/2 justify-center transform -translate-x-1/2">
            <button
              onClick={onRent}
              type="button"
              className=" bg-white font-bold border-r text-black border-gray-300 px-3 py-1 text-xs"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <BiPlus />
            </button>
            <button
              onClick={onRent}
              type="button"
              className=" bg-white font-bold border-r text-black border-gray-300 px-3 py-1 text-xs "
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {totalProducts} productos disponibles
            </button>
            <button
              onClick={onRent}
              type="button"
              className=" bg-white font-bold  px-3 py-1 text-xs text-black"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <BiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
