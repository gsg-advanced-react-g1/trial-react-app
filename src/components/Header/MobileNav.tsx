import { useState } from "react";
import { Burger, Drawer, Stack } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { IconBuildingStore } from "@tabler/icons-react";
import type { MobileNavProps, NavItem } from "./types";

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

function MobileNav({ className }: MobileNavProps) {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  return (
    <>
      <div className={`flex items-center gap-3 shrink-0 ${className ?? ""}`}>
        {/* Mobile Burger Menu */}
        <div className="lg:hidden">
          <Burger
            opened={mobileMenuOpened}
            onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
            aria-label="Toggle navigation"
            size="sm"
          />
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold text-base sm:text-lg flex items-center gap-2 cursor-pointer">
            <IconBuildingStore size={24} className="shrink-0" />
            <span className="hidden xs:inline sm:inline">Ecommerce</span>
          </span>
        </Link>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
        position="left"
        size="xs"
        padding="md"
        title={
          <div className="flex items-center gap-2">
            <IconBuildingStore size={24} />
            <span className="font-bold text-lg">Ecommerce</span>
          </div>
        }
      >
        <Stack gap="md">
          {navItems.map((nav) => (
            <Link
              key={nav.label}
              to={nav.href}
              className="text-lg transition-all duration-300 py-2 hover:opacity-80"
              activeProps={{ className: "border-b-2 font-semibold" }}
              inactiveProps={{ className: "" }}
              onClick={() => setMobileMenuOpened(false)}
            >
              {nav.label}
            </Link>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}

export default MobileNav;
