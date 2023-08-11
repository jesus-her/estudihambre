import { Nunito, Shrikhand } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import Categories from "./components/navbar/Categories";
import HomeBanner from "./components/HomeBanner";
import BottomNavbar from "./components/navbar/BottomNavbar";

export const metadata = {
  title: "Estudihambre",
  description: "Estudihambre app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />

          {currentUser && <BottomNavbar currentUser={currentUser} />}

          <Categories />
        </ClientOnly>
        <div className="pb-20">{children}</div>
      </body>
    </html>
  );
}
