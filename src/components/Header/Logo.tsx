import { Link } from "@tanstack/react-router";
import { IconBuildingStore } from "@tabler/icons-react";
import type { LogoProps } from "./types";

function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center shrink-0 ${className ?? ""}`}>
      <span className="font-bold text-base sm:text-lg flex items-center gap-2 cursor-pointer">
        <IconBuildingStore size={24} className="shrink-0" />
        <span className="hidden xs:inline sm:inline">Ecommerce</span>
      </span>
    </Link>
  );
}

export default Logo;
