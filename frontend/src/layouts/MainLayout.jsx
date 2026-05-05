import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
