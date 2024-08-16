import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ConvertNav(props) {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" || location.pathname === "/register";
  return (
    <div>
      {!hideHeader && <Header />}

      <Outlet />
      {!hideHeader && <Footer />}
    </div>
  );
}

export default ConvertNav;
