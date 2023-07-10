"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="  items-center gap-1 block  cursor-pointer px-3 py-0 rounded-full text-primary text-3xl font-extrabold"
    >
      {/* <Image
        onClick={() => router.push("/")}
        className="hidden md:block cursor-pointer"
        src="/images/mochila.png"
        height="25"
        width="25"
        alt="Logo"
      /> */}
      Estudihambre
    </div>
  );
};

export default Logo;
