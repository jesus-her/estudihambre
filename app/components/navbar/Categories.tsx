"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiAppsFill } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbCandy } from "react-icons/tb";
import { MdLunchDining, MdFastfood } from "react-icons/md";
import { SiCoffeescript } from "react-icons/si";
import { GiTacos, GiSandwich, GiDonut } from "react-icons/gi";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import HomeBanner from "../HomeBanner";
import { SafeUser } from "@/app/types";

export const categories = [
  {
    label: "Dulces",
    icon: TbCandy,
    description: "¡Una variedad de golosinas dulces para satisfacer tu antojo!",
  },
  {
    label: "Tortas",
    icon: MdLunchDining,
    description:
      "¡Deliciosas tortas perfectas para cualquier ocasión especial!",
  },
  {
    label: "Sándwich",
    icon: GiSandwich,
    description:
      "¡Sabrosos sándwiches preparados con ingredientes frescos y deliciosos!",
  },
  {
    label: "Tacos",
    icon: GiTacos,
    description: "¡Tacos auténticos con sabores únicos y llenos de sabor!",
  },
  {
    label: "Snacks",
    icon: MdFastfood,
    description:
      "¡Una selección de bocadillos deliciosos y rápidos para satisfacer tu hambre!",
  },
  {
    label: "Postres",
    icon: GiDonut,
    description:
      "¡Exquisitos postres que te harán salivar y endulzarán tu día!",
  },
  {
    label: "Bebidas",
    icon: BiDrink,
    description:
      "¡Refrescantes y variadas bebidas para saciar tu sed y disfrutar al máximo!",
  },
  {
    label: "Cafetería",
    icon: SiCoffeescript,
    description: "¡Un buen café para relajarte!",
  },
  {
    label: "Otros",
    icon: RiAppsFill,
    description: "",
  },
];

const Categories = ({
  currentUser,
  totalProducts,
}: {
  currentUser: SafeUser | null;
  totalProducts: number;
}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const router = useRouter();

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <HomeBanner currentUser={currentUser} totalProducts={totalProducts} />
      <div className=" my-2 flex flex-row justify-between items-end">
        <div className=" font-bold text-xl">Categorías</div>
        <div
          onClick={() => router.push("/")}
          className=" font-semibold text-xs bg-black text-white rounded-full px-2 py-1 cursor-pointer hover:opacity-80"
        >
          Remover filtros
        </div>
      </div>
      <div
        className="
          flex 
          flex-row 
          items-start 
          justify-between
          overflow-x-auto gap-3  pb-5 pt-1 
          
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
