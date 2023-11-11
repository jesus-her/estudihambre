"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiHome, HiHeart, HiViewList } from "react-icons/hi";
//https://www.npmjs.com/package/clsx
//@ts-ignore
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import { useActiveSectionContext } from "@/app/context/active-section-context";
const links = [
  {
    name: "Home",
    route: "/",
    label: "Inicio",
    icon: React.createElement(HiHome),
  },
  {
    name: "Favorites",
    route: "/favorites",
    label: "Favoritos",
    icon: React.createElement(HiHeart),
  },
  {
    name: "myproducts",
    route: "/properties",
    label: "Mis Productos",
    icon: React.createElement(HiViewList),
  },
];

export default function BottomNavbar({
  currentUser,
}: {
  currentUser: SafeUser | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="flex justify-center fixed bottom-2 w-screen z-[11]">
      <motion.nav className="dark:bg-white bg-black shadow-2xl rounded-full  px-2 py-1 ">
        <ul className="flex items-center justify-center font-medium px-2 py-1 text-neutral-400 gap-6 rounded-full">
          {links.map((link, index) => (
            <motion.li
              className="relative"
              key={link.route}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex flex-col text-[10px] items-center justify-center w-fit transition px-1",
                  {
                    "text-primary dark:text-primary": pathname === link.route,
                  }
                )}
                href={link.route}
                onClick={() => {
                  router.push(link.route);
                }}
              >
                <div className=" text-xl">{link.icon}</div>

                {link.label}

                {link.route === pathname && (
                  <motion.span
                    className={`bg-primary rounded-full w-1 h-1 absolute -bottom-1  dark:bg-primary`}
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
          {/* <ThemeSwitch /> */}
        </ul>
      </motion.nav>
    </header>
  );
}
