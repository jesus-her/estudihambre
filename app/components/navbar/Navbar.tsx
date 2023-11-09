import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Avatar from "../Avatar";
import { Shrikhand } from "next/font/google";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const font = Shrikhand({
  weight: "400",
  subsets: ["latin"],
});
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className=" sticky top-0 w-full z-[11] shadow-sm mb-4">
      <div className=" bg-gradient-to-t from-[#ff914d] to-primary  py-4">
        {/* <div className=" bg-primary  py-4"> */}
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-start
            relative  
            "
          >
            <div>
              <UserMenu currentUser={currentUser} />
            </div>

            <Logo />

            {/* <Search /> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
