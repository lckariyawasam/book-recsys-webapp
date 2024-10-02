import { FooterLinks } from "../_components/users/Footer/Footer";
import { HeaderTabs } from "../_components/users/HeaderTabs/HeaderTabs";
import { NavbarNested } from "../_components/users/NavBarNested/NavbarNested";

export default function UserLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <>
      <div className="flex p-2">
        <div>
          <NavbarNested />
        </div>
        <div className="w-full ml-60">
          <HeaderTabs />
          <div className="py-10 px-24">{children}</div>
        </div>
      </div>
      <div className="ml-60">
        <FooterLinks />
      </div>
    </>
  );
}
