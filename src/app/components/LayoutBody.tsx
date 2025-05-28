"use client";
import { Gothic_A1, Kanit } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { ApolloWrapper } from "../ApolloWrapper";
import { useContext } from "react";
import { MobileNavContext } from "./NavContext";

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Specify the desired font weights
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"], // Specify the desired font weights
});

const LayoutBody = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const mobileNavIsActive = useContext(MobileNavContext);
  return (
    <div
      className={`bg-gray-50 min-h-screen overflow-x-hidden transition delay-75 ${
        gothicA1.variable
      } ${kanit.variable} ${
        mobileNavIsActive ? "fixed md:relative" : "relative "
      } text-primary antialiased flex flex-col flex-1 justify-center w-full mx-auto px-0`}
    >
      <div
        className={`fixed md:relative top-0 right-0 bottom-0 w-full h-screen md:h-auto bg-primary md:bg-transparent transform transition-transform duration-400 ease-in-out overflow-y-auto ${
          mobileNavIsActive ? " translate-x-0 -z-0" : "translate-x-full z-30"
        }`}
      ></div>
      <Header />
      <ApolloWrapper>
        <main
          className={`flex-1 flex flex-col mx-auto items-center min-h-0 shadow-sm bg-white max-w-[1440px] w-full`}
        >
          {children}
        </main>
        <Footer />
      </ApolloWrapper>
    </div>
  );
};

export default LayoutBody;
