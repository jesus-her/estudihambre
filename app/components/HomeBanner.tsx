import { SafeUser } from "@/app/types";

import { Shrikhand } from "next/font/google";
import Container from "./Container";
import Filter2DiagonalLines from "./filters/Filter2DiagonalLines";
import Filter3Colors from "./filters/Filter3Colors";
import Filter1GrainTexture from "./filters/Filter1GrainTexture";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const font = Shrikhand({
  weight: "400",
  subsets: ["latin"],
});
const HomeBanner: React.FC<NavbarProps> = () => {
  return (
    <div className=" flex flex-col gap-0 text-white w-full font-extrabold justify-center items-center bg-white shadow-sm  p-4 rounded-lg relative">
      <Filter1GrainTexture />
      <Filter3Colors />

      <span className=" text-xl md:text-2xl text-black  relative  ">
        Estudia sin hambre
        <Filter2DiagonalLines />
      </span>

      <span
        className={`${font.className} text-4xl md:text-6xl tracking-wide  text-transparent  bg-clip-text bg-gradient-to-r from-[#004AAD] to-[#FF66C4] text-center relative
         rounded-full  overflow-hidden`}
      >
        compra <span className="  text-yellow-500">& </span>
        vende
        {/* <Filter1GrainTexture /> */}
        <Filter2DiagonalLines />
      </span>
      <span className=" text-lg md:text-xl  tracking-wide text-black px-3 relative ">
        comida a los estudiantes
        <Filter2DiagonalLines />
      </span>
    </div>
  );
};

export default HomeBanner;