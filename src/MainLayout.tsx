import { Outlet } from "@tanstack/react-router";
import Header from "./components/Header";

const MainLayout = () => {
  return (
    <div>
      <Header>
        <Header.MobileNav />
        <Header.Navs />
        <Header.AccountOptions />
      </Header>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
