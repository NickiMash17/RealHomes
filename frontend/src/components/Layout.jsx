import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SkipToContent from "./SkipToContent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F5EF" }}>
      <SkipToContent />
      <Header />
      <main id="main-content" className="pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
