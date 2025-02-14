import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="my-5 container py-20 lg:py-10  mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
