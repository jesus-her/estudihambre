"use client";

import { useCallback, useState } from "react";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { BiListPlus, BiListUl, BiLogOut, BiPlus } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { RiProductHuntFill } from "react-icons/ri";

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
        {/* <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div> */}
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-2
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
 
          rounded-full 
          cursor-pointer 
          hover:shadow-xl 
          transition 
          "
        >
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div
          className=" absolute bg-[rgba(0,0,0,0)] w-screen h-screen -top-[1rem] bottom-0 -left-[3rem] right-0"
          onClick={toggleOpen}
        >
          <div
            className="
            absolute 
            rounded-xl 
            shadow-md
            w-[50vw]
            md:w-[35vw]
            bg-white
            overflow-hidden 
            left-[3rem]
            top-[4rem]
            text-sm bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border border-gray-100
          "
          >
            <div className="flex flex-col cursor-pointer ">
              {currentUser ? (
                <>
                  <div className="  px-4 py-3  transitionfont-semibold flex flex-col items-center justify-center font-bold">
                    <Avatar src={currentUser?.image} />
                    {currentUser?.name}
                  </div>
                  <hr />
                  {/* <MenuItem
                    label="Mis pedidos"
                    onClick={() => {
                      router.push("/trips");
                      toggleOpen();
                    }}
                  /> */}
                  <MenuItem
                    icon={<AiOutlineHeart />}
                    label="Mis favoritos"
                    onClick={() => {
                      router.push("/favorites");
                      setTimeout(() => {
                        setIsOpen(false);
                      }, 500);
                    }}
                  />
                  {/* <MenuItem
                    label="Mis pedidos"
                    onClick={() => {
                      router.push("/reservations");
                      toggleOpen();
                    }}
                  /> */}
                  <MenuItem
                    icon={<BiListUl />}
                    label="Mis productos"
                    onClick={() => {
                      router.push("/properties");
                      setTimeout(() => {
                        setIsOpen(false);
                      }, 500);
                    }}
                  />
                  <MenuItem
                    icon={<BiPlus />}
                    label="Publicar un producto"
                    onClick={rentModal.onOpen}
                  />
                  <hr />
                  <MenuItem
                    icon={<BiLogOut />}
                    label="Cerrar sesión"
                    onClick={() => signOut()}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    label="Iniciar sesión"
                    onClick={loginModal.onOpen}
                  />
                  <MenuItem
                    label="Registrarse"
                    onClick={registerModal.onOpen}
                  />
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
