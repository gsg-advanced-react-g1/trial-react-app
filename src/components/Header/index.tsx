import type { ReactElement } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import Navs from "./Navs";
import AccountOptions from "./AccountOptions";
import type {
  HeaderProps,
  LogoProps,
  MobileNavProps,
  NavsProps,
  AccountOptionsProps,
} from "./types";

type HeaderComponent = ((props: HeaderProps) => ReactElement) & {
  Logo: (props: LogoProps) => ReactElement;
  MobileNav: (props: MobileNavProps) => ReactElement;
  Navs: (props: NavsProps) => ReactElement;
  AccountOptions: (props: AccountOptionsProps) => ReactElement;
};

function HeaderRoot({ children, className }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 mb-3 flex items-center justify-between gap-4 rounded-lg p-3 md:px-6 shadow-xl backdrop-blur-lg ${className ?? ""}`}
    >
      {children ?? (
        <>
          <Logo />
          <Navs />
          <AccountOptions />
        </>
      )}
    </header>
  );
}

const Header = HeaderRoot as HeaderComponent;
Header.Logo = Logo;
Header.MobileNav = MobileNav;
Header.Navs = Navs;
Header.AccountOptions = AccountOptions;

export { Logo, MobileNav, Navs, AccountOptions };
export type {
  HeaderProps,
  LogoProps,
  MobileNavProps,
  NavsProps,
  AccountOptionsProps,
};
export default Header;
