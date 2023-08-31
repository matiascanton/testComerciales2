"use client";
import { Typography } from "@mui/material";
import { useScreen } from "./hooks";
import { Appbar, Loader, Navbar } from "./components";
import { ThemeProvider, useTheme } from "./context/themeContext";
import Image from "next/image";
import onlySmartPhone from "@/public/assets/onlysmarthpone.jpg";
// import "@fontsource/roboto/300.css";

import { Oxygen } from "next/font/google";

const inter = Oxygen({
  weight: "700",
  subsets: ["latin", "latin-ext"],
});
function LayoutPages({ children }: { children: React.ReactNode }) {
  const { mobileScreen, loaderScreen } = useScreen();
  const { theme } = useTheme();

  return loaderScreen ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    <main>
      {mobileScreen ? (
        <div
          className={`bg-${
            theme !== "dark" ? "white" : "gray-800"
          } flex flex-col h-screen w-screen`}
        >
          <Navbar />
          <div className="flex-grow overflow-auto">{children}</div>
          {/*<Appbar />*/}
        </div>
      ) : (
        <div className="h-screen justify-center flex items-center relative w-screen">
          <div className="w-1/2 p-20 h-full flex justify-center items-center">
            <p className={`font-bold text-6xl font  ${inter.className}`}>
              ¡App disponible únicamente para SmartPhones!
            </p>
          </div>
          <div className="relative w-1/2 h-full flex justify-center items-center">
            <Image
              className="absolute  right-0 bottom-0 "
              src={onlySmartPhone}
              alt="onlysmartphone"
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default LayoutPages;
