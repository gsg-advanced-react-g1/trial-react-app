import type { ReactNode } from "react";

export interface HeaderProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface LogoProps {
  readonly className?: string;
}

export interface MobileNavProps {
  readonly className?: string;
}

export interface NavsProps {
  readonly className?: string;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface AccountOptionsProps {
  readonly className?: string;
}
