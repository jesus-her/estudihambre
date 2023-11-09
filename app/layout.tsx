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
import BottomNavbar from "./components/navbar/BottomNavbar";
import getListings from "./actions/getListings";
import ThemeContextProvider from "./context/theme-context";

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
  const listings = await getListings({ userId: currentUser?.id });

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeContextProvider>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
            {currentUser && <BottomNavbar currentUser={currentUser} />}
            <Categories
              currentUser={currentUser}
              totalProducts={listings.length}
            />
          </ClientOnly>
          <div className="pb-20">{children}</div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
