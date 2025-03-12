import React, { ReactNode } from "react";
import TopBar from "../topBar/topBar";
import Header from "../header/header";
import HeaderMenu from "../header/headerMenu";
import HeaderMenuMobile from "../header/headerMenuMobile";
import Footer from "../footer/footer";
import BottomNavMenu from "../bottomNavMenu/bottomNavMenu";
import Contact from "../contact/contact";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import useOrderStore from "../../store/orderStore";
import { NAME_STORAGE_ORDER } from "../../utils/contanst";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { orders } = useOrderStore();

  //get order from localstorage and set into order store
  React.useEffect(() => {
    const orderStorage = localStorage.getItem(NAME_STORAGE_ORDER);
    if (orderStorage) {
      useOrderStore.setState({ orders: JSON.parse(orderStorage) });
    }
  }, []);

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
