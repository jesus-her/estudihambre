"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 flex items-center justify-center"
    >
      <Image
        onClick={() => router.push("/")}
        className="block cursor-pointer"
        src="/images/logo-white.png"
        height="25"
        width={250}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;
