"use client";

import { useCallback, useState } from "react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import {
  BiHomeAlt2,
  BiListUl,
  BiLogIn,
  BiLogOut,
  BiMenuAltLeft,
  BiPlus,
  BiRegistered,
} from "react-icons/bi";
import Filter3Colors from "../filters/Filter3Colors";
import Filter2DiagonalLines from "../filters/Filter2DiagonalLines";
import Filter1GrainTexture from "../filters/Filter1GrainTexture";
import { MdClose } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className=" p-2 md:py-2 md:px-2 border-[1px border-neutral-200 flex flex-row items-center rounded-full cursor-pointer hover:shadow-xl transition bg-[#fff]"
        >
          <BiMenuAltLeft size={20} />
        </div>
        <div
          onClick={onRent}
          className=" hidden md:block text-sm  py-2 px-4 rounded-full bg-[#ffffff] hover:bg-neutral-200 transition cursor-pointer font-bold"
        >
          ¡Pon algo a la venta!
        </div>
      </div>
      {isOpen && (
        <div
          className="           flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
           z-[999]     bg-neutral-800/70 w-screen h-screen top-0 left-0  "
          onClick={toggleOpen}
        >
          <div
            className=" absolute  rounded-xl  shadow-md w-[50vw] md:w-[35vw] bg-white overflow-hidden left-[1rem] top-[4rem]
             text-sm bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border border-gray-100"
          >
            <div
              onClick={toggleOpen}
              className=" absolute top-1 right-1 cursor-pointer "
            >
              <IoMdCloseCircle size={22} onClick={toggleOpen} />
            </div>
            <div className="flex flex-col cursor-pointer text-sm">
              {currentUser ? (
                <>
                  <div className="  px-4 py-3  transitionfont-semibold flex flex-col items-center justify-center font-bold text-center relative">
                    <Avatar src={currentUser?.image} />
                    {currentUser?.name} <br />
                    <div className=" opacity-60">{currentUser?.email}</div>
                  </div>
                  <hr />

                  <div
                    onClick={onRent}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  `}
                  >
                    <BiPlus size={22} />
                    Publicar un producto
                  </div>
                  <hr />

                  <div
                    onClick={() => signOut()}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  text-red-600 `}
                  >
                    <BiLogOut size={18} />
                    Cerrar Sesión
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      router.push("/");
                      setTimeout(() => {
                        setIsOpen(false);
                      }, 500);
                    }}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  `}
                  >
                    <AiFillHome size={18} />
                    Inicio
                  </div>
                  <div
                    onClick={onRent}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  `}
                  >
                    <BiPlus size={22} />
                    Publicar un producto
                  </div>
                  <hr />

                  <div
                    onClick={loginModal.onOpen}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  `}
                  >
                    Iniciar Sesión
                  </div>

                  <div
                    onClick={registerModal.onOpen}
                    className={` items-center justify-start  flex cursor-pointer gap-2 py-2 px-4  `}
                  >
                    Registrarse
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
