"use client";

import React from "react";
import { SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import { AiFillHeart, AiFillHome } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";

import MenuItem from "./MenuItem";
import { BiHomeAlt2, BiListUl } from "react-icons/bi";

export default function BottomNavbar({
  currentUser,
}: {
  currentUser: SafeUser | null;
}) {
  //   const { activeSection, setActiveSection, setTimeOfLastClick } =
  //     useActiveSectionContext();
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);

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

  const iconSize = 20;

  return (
    <header className=" relative z-10 ">
      <nav className="flex fixed bottom-0 left-1/2 h-fit -translate-x-1/2 bg-white rounded-3xl py-2 px-4 overflow-hidden shadow-2xl border border-gray-300 w-full rounded-b-none justify-between">
        <MenuItem
          icon={<AiFillHome size={iconSize} />}
          label="Inicio"
          active={pathname === "/"}
          onClick={() => {
            router.push("/");
          }}
        />
        <MenuItem
          icon={<AiFillHeart size={iconSize} />}
          label="Favoritos"
          active={pathname === "/favorites"}
          onClick={() => {
            router.push("/favorites");
          }}
        />

        <MenuItem
          icon={<BiListUl size={iconSize} />}
          label="Mis Productos"
          active={pathname === "/properties"}
          onClick={() => {
            router.push("/properties");
          }}
        />
      </nav>
    </header>
  );
}
