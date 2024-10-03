import Link from "next/link";
import { FooterLinks } from "../_components/users/Footer/Footer";
import { HeaderTabs } from "../_components/users/HeaderTabs/HeaderTabs";
import { NavbarNested } from "../_components/users/NavBarNested/NavbarNested";
import CustomButton from "../_components/Button";

export default function UserLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <>
      <div className="flex py-2">
        <div>
          <NavbarNested />
        </div>
        <div className="w-full">
          <HeaderTabs />
          <div className="ml-60 mt-16 py-10 px-24 space-y-10">
            {/* Top Button section */}
            {children}
          </div>
        </div>
      </div>
      <div className="ml-60">
        <FooterLinks />
      </div>
    </>
  );
}
