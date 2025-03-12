import React, { ReactNode, useEffect } from "react";
import TopBar from "../topBar/topBar";
import Header from "../header/header";
import HeaderMenu from "../header/headerMenu";
import HeaderMenuMobile from "../header/headerMenuMobile";
import Footer from "../footer/footer";
import BottomNavMenu from "../bottomNavMenu/bottomNavMenu";
import Contact from "../contact/contact";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { useProductStore } from "../../stores/productStore";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    // Fetch products when app starts
    fetchProducts();
  }, [fetchProducts]);

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
