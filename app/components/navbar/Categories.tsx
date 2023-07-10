"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { RiAppsFill } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbCandy } from "react-icons/tb";
import { MdLunchDining, MdFastfood } from "react-icons/md";
import { SiCoffeescript } from "react-icons/si";
import { GiTacos, GiSandwich, GiDonut } from "react-icons/gi";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

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
    label: "Sándwiches",
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
  // {
  //   label: "Lake",
  //   icon: GiBoatFishing,
  //   description: "This property is near a lake!",
  // },
  // {
  //   label: "Skiing",
  //   icon: FaSkiing,
  //   description: "This property has skiing activies!",
  // },
  // {
  //   label: "Castles",
  //   icon: GiCastle,
  //   description: "This property is an ancient castle!",
  // },
  // {
  //   label: "Caves",
  //   icon: GiCaveEntrance,
  //   description: "This property is in a spooky cave!",
  // },
  // {
  //   label: "Camping",
  //   icon: GiForestCamp,
  //   description: "This property offers camping activities!",
  // },
  // {
  //   label: "Arctic",
  //   icon: BsSnow,
  //   description: "This property is in arctic environment!",
  // },
  // {
  //   label: "Desert",
  //   icon: GiCactus,
  //   description: "This property is in the desert!",
  // },
  // {
  //   label: "Barns",
  //   icon: GiBarn,
  //   description: "This property is in a barn!",
  // },
  // {
  //   label: "Lux",
  //   icon: IoDiamond,
  //   description: "This property is brand new and luxurious!",
  // },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className=" pt-2 font-bold text-primary">Categorias</div>
      <div
        className="
          pt-2
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto 
          
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
