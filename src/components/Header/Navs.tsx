import { Group } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { NavItem, NavsProps } from "./types";

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
];

function Navs({ className }: NavsProps) {
  return (
    <div
      className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 ${className ?? ""}`}
    >
      <Group className="flex items-center justify-center gap-8">
        {navItems.map((nav) => (
          <Link
            key={nav.label}
            to={nav.href}
            className="hover:text-black dark:hover:text-white transition-all duration-300"
            activeProps={{ className: "border-b-1" }}
            inactiveProps={{ className: "" }}
          >
            {nav.label}
          </Link>
        ))}
      </Group>
    </div>
  );
}

export default Navs;
