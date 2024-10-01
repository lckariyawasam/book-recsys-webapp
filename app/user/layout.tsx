import { HeaderTabs } from "../_components/users/HeaderTabs/HeaderTabs";
import { NavbarNested } from "../_components/users/NavBarNested/NavbarNested";

export default function UserLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="flex p-2">
      <div>
        <NavbarNested />
      </div>
      <div className="w-full">
        <HeaderTabs />
        <div className="py-5 px-24">
        {children}
        </div>
      </div>
    </div>
  );
}
