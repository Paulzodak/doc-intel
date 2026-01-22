import React from "react";
import ResponsiveWrapper from "../atoms/ResponsiveWrapper";
import Navbar from "../nav/Navbar";
import DecorativeDots from "../DecorativeDots";

interface IProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}
const MainLayout = ({ children, showNavbar = true }: IProps) => {
  return (
    <div className="relative overflow-hidden">
      <DecorativeDots count={100} />
      <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="relative font-nunito mx-auto"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          // style={{
          //   backgroundImage: `url('https://images.unsplash.com/photo-1518896830268-e472923c4fa3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          //   opacity: 0.1,
          // }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" /> */}
        <div className="relative z-10 ">
          {/* <ResponsiveWrapper> */}
          {showNavbar && <Navbar />}
          <div className="py-20 md:py-0">{children}</div>
          {/* </ResponsiveWrapper> */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
