import { Button, Group } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ModeToggleBtn } from "../modules/Theme/Views/ModeToggleBtn";
import { IconBuildingStore } from "@tabler/icons-react";

const navs = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
];

const Header = () => {
  const matchRoute = useMatchRoute();

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 mb-3 flex items-center justify-between rounded-lg p-3 shadow-xl backdrop-blur-lg " >

      <Link to="/" className="flex items-center">
        <span className="font-bold text-lg flex items-center gap-2 cursor-pointer">
          <IconBuildingStore size={24} />
          Ecommerce
        </span>
      </Link>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Group className="flex items-center justify-center gap-8">
          {navs.map((nav) => {
            const isActive = !!matchRoute({ to: nav.href });
            return (
              <Link
                key={nav.label}
                to={nav.href}
                className={`hover:text-black dark:hover:text-white transition-all duration-300 
                  ${isActive ? "border-b-1" : ""}`}
              >
                {nav.label}
              </Link>
            );
          })}
        </Group>
      </div>
      <div className="flex items-center gap-5">
        <ModeToggleBtn />
        <div className="flex items-center gap-3">
          <Button variant="outline">Login</Button>
          <Button variant="">Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;