import React, { ReactNode } from "react";
import TopBar from "../topBar/topBar";
import Header from "../header/header";
import HeaderMenu from "../header/headerMenu";
import HeaderMenuMobile from "../header/headerMenuMobile";
import Footer from "../footer/footer";
import BottomNavMenu from "../bottomNavMenu/bottomNavMenu";
import Contact from "../contact/contact";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <div className="flew flex-col">
        <TopBar />
        <Header />
        <HeaderMenu />
        <HeaderMenuMobile />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
        <BottomNavMenu />
        <Contact />
      </div>
    </div>
  );
}

export default Layout;
