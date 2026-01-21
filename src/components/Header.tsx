import { Button, Group } from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  return (
    <header className="shadow-lg h-11.25 bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-center">
      <Group className="flex items-center w-[80vw] max-w-5xl justify-center gap-8">
        <span
          onClick={() => navigate({ to: "/" })}
          className="font-bold text-lg flex items-center gap-2 cursor-pointer text-black"
        >
          {" "}
          <IconBuildingStore size={24} /> Ecommerce
        </span>
        {navs.map((nav) => (
          <Link
            key={nav.label}
            to={nav.href}
            style={{ color: "#999" }}
            activeOptions={{ exact: true }}
            activeProps={{ style: { color: "black" } }}
            className="hover:text-black transition-all duration-300"
          >
            {nav.label}
          </Link>
        ))}
      </Group>
      <div className="absolute right-5 flex items-center gap-5">
        <ModeToggleBtn />
        <div className="flex items-center gap-3">
          <Button>Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
