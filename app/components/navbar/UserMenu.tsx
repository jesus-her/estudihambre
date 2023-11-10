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
import ThemeSwitch from "../theme-switch";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  User,
  DropdownSection,
} from "@nextui-org/react";
import Home from "@/app/page";

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
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat" radius="full" className=" bg-white">
          <BiListUl size={22} className=" text-black " />
        </Button>
      </DropdownTrigger>
      {currentUser ? (
        <>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownSection showDivider>
              <DropdownItem key="user">
                <User
                  name={currentUser?.name}
                  description={currentUser?.email}
                  avatarProps={{
                    //@ts-ignore
                    src: currentUser.image,
                  }}
                />
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem
                key="home"
                onClick={() => router.push("/")}
                startContent={<AiFillHome />}
              >
                Inicio
              </DropdownItem>
              <DropdownItem
                key="post"
                onClick={onRent}
                startContent={<BiPlus />}
              >
                Publicar un producto
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem key="theme" isReadOnly endContent={<ThemeSwitch />}>
                Theme
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={() => signOut()}
              startContent={<BiLogOut />}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </>
      ) : (
        <>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownSection showDivider>
              <DropdownItem
                key="home"
                onClick={() => router.push("/")}
                startContent={<AiFillHome />}
              >
                Inicio
              </DropdownItem>
              <DropdownItem
                key="post2"
                onClick={onRent}
                startContent={<BiPlus />}
              >
                Publicar un producto
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider>
              <DropdownItem key="theme" isReadOnly endContent={<ThemeSwitch />}>
                Theme
              </DropdownItem>
            </DropdownSection>
            <DropdownItem key="login" onClick={loginModal.onOpen}>
              Iniciar Sesión
            </DropdownItem>
            <DropdownItem key="register" onClick={registerModal.onOpen}>
              Regístrate
            </DropdownItem>
          </DropdownMenu>
        </>
      )}
    </Dropdown>
  );
};

export default UserMenu;
